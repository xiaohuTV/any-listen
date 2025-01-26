<script lang="ts">
  import Btn from '@/components/base/Btn.svelte'
  import Input from '@/components/base/Input.svelte'
  import { tick } from 'svelte'
  import { t } from '@/plugins/i18n'
  import SvgIcon from '@/components/base/SvgIcon.svelte'

  let { onsave, disabled = false }: { onsave: (name: string) => void, disabled?: boolean } = $props()

  let isEditing = $state(false)
  let input: Input | null = $state(null)

  const handleEditing = () => {
    if (isEditing) return
    // if (!this.newPresetName) this.newPresetName = this.listName
    isEditing = true
    void tick().then(() => {
      input?.focus()
    })
  }

  const handleSave = (input: HTMLInputElement) => {
    let name = input.value.trim()
    input.value = ''
    isEditing = false
    if (!name) return
    if (name.length > 20) name = name.substring(0, 20)
    onsave(name)
  }
</script>

<span class="newPreset" class:editing={isEditing}>
  <Btn
    min
    {disabled}
    aria-label={$t('player__sound_effect_biquad_filter_save_input')}
    onclick={handleEditing}
  >
    <SvgIcon name="plus" />
    <Input
      bind:this={input}
      placeholder={$t('player__sound_effect_biquad_filter_save_input')}
      onkeydown={event => {
        if (event.key == 'Enter') handleSave(event.target as HTMLInputElement)
      }}
      onblur={event => {
        handleSave(event.target as HTMLInputElement)
      }}
    />
  </Btn>
</span>

<style lang="less">
  .newPreset {
    display: flex;
    &.editing {
      :global {
        .btn {
          opacity: 1;
          width: 90px;
        }

        svg {
          display: none;
        }
        .input {
          display: block;
        }
      }
    }
    :global {
      .btn {
        position: relative;
        border: 1px dashed var(--color-primary-font-hover);
        // background-color: var(--color-main-background);
        color: var(--color-primary-font-hover);
        opacity: 0.7;
        height: 22px;
      }

      .svg-icon {
        vertical-align: 0;
      }
      .input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        // line-height: 16px;
        background: none !important;
        font-size: 12px;
        text-align: center;
        font-family: inherit;
        box-sizing: border-box;
        padding: 0 3px;
        border-radius: 0;
        display: none;
        &::placeholder {
          font-size: 12px;
        }
      }
    }
  }
</style>
