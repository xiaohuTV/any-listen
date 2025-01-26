<script lang="ts">
  import Modal from '@/components/material/Modal.svelte'
  import { t } from '@/plugins/i18n'
  import Btn from '@/components/base/Btn.svelte'
  import ListTypeSelect from './ListTypeSelect.svelte'
  import { createUserList, editUserList } from './shared'
  import Input from '@/components/base/Input.svelte'
  import { musicLibraryState } from '@/modules/musicLibrary/store/state'

  let {
    onafterleave,
  }: {
    onafterleave: () => void
  } = $props()

  let visible = $state(false)
  let isEdit = $state(false)
  let listType = $state<AnyListen.List.UserListType>('general')
  let listName = $state('')
  let targetId: string | undefined

  const closeModal = () => {
    visible = false
  }

  const handleComfirm = async () => {
    if (isEdit) {
      await editUserList(targetId!, listName)
    } else {
      await createUserList(listType, listName, targetId)
    }
    closeModal()
  }

  const verify = () => {
    const name = listName.trim()
    if (!name.length || name.length > 30) {
      return false
    }
    // switch (listType) {
    //   case 'general':

    //     break

    //   default:
    //     break
    // }
    return true
  }
  let verifyStatus = $derived(verify())

  const resetForm = () => {
    listName = ''
  }
  export const show = (_targetId?: string, _isEdit = false) => {
    targetId = _targetId
    isEdit = _isEdit
    resetForm()
    if (_isEdit) {
      const info = musicLibraryState.userLists.find((l) => l.id == _targetId)
      if (!info) return
      listName = info.name
    }
    visible = true
  }

  // $effect(() => {
  //   if (!visible) return
  // })
</script>

<Modal bind:visible teleport="#root" bgclose={false} {onafterleave}>
  <main class="main">
    <div class="header">
      <h2>{isEdit ? $t('edit_list_modal__edit_title') : $t('edit_list_modal__new_title')}</h2>
    </div>
    <div class="content">
      <ListTypeSelect bind:value={listType} disabled={isEdit} />
      <Input autofocus placeholder={$t('edit_list_modal__form_list_name')} bind:value={listName} />
    </div>
    <div class="footer">
      <!-- <Btn onclick={closeModal}>{$t('btn_cancel')}</Btn> -->
      <Btn disabled={!verifyStatus} onclick={handleComfirm}>{$t('btn_confirm')}</Btn>
    </div>
  </main>
</Modal>

<style lang="less">
  .main {
    flex: auto;
    padding: 0 15px;
    width: 320px;
    display: flex;
    flex-flow: column nowrap;
    min-height: 0;
    // max-height: 100%;
    // overflow: hidden;
  }
  .header {
    flex: none;
    padding: 15px;
    text-align: center;
    h2 {
      color: var(--color-font);
      word-break: break-all;
    }
  }

  .content {
    flex: auto;
    display: flex;
    flex-flow: column nowrap;
    gap: 10px;
    // font-size: 14px;
    // color: var(--color-font-label);
    // padding: 10px 0 8px;
  }

  .footer {
    flex: none;
    margin: 20px 0 15px auto;
    display: flex;
    flex-direction: row;
    gap: 10px;

    :global(.btn) {
      min-width: 70px;
    }
  }
</style>
