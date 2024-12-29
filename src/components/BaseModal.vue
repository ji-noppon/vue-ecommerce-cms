<script setup lang="ts">
import { useBaseModalStore } from '@/stores/BaseModalStore'
import { storeToRefs } from 'pinia';

const baseModalStore = useBaseModalStore()
const { closeModal } = baseModalStore
const { isOpen } = storeToRefs(baseModalStore)

interface Props {
  clickOutSide?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  clickOutSide: false
})

function close() {
  if (props.clickOutSide) {
    closeModal()
  }
}

</script>

<template>
  <Transition>
    <div v-show="isOpen" class="overlay"></div>
  </Transition>
  <Transition v-show="isOpen" name="bounce">
    <div class="modal-wrap" @click="close">
      <div class="modal-container">
        <slot name="content"></slot>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.overlay {
  @apply bg-gray-500 opacity-50 w-full h-full absolute left-0 top-0
}
.modal-wrap {
  @apply absolute z-10 left-0 top-0 w-full h-full flex justify-center items-center
}

.modal-container {
  @apply bg-slate-50 rounded-md p-4 relative
}

.modal-footer {

}


.bounce-enter-active {
  animation: bounce-in 0.3s;
}
.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
