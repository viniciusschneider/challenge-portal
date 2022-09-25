<template>
  <div class="loading">
    <div class="loading-container">
      <div class="line">
        <div class="c-1"></div>
        <div class="c-2"></div>
        <div class="c-3"></div>
        <div class="c-4"></div>
      </div>

      <div class="line">
        <div class="c-5"></div>
        <div class="c-6"></div>
        <div class="c-7"></div>
        <div class="c-8"></div>
      </div>

      <div class="line">
        <div class="c-9"></div>
        <div class="c-10"></div>
        <div class="c-11"></div>
        <div class="c-12"></div>
      </div>

      <div class="line">
        <div class="c-13"></div>
        <div class="c-14"></div>
        <div class="c-15"></div>
        <div class="c-16"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class Loading extends Vue {}
</script>

<style lang="scss" scoped>
$colors: (
  #d4aee0,
  #8975b4,
  #64518a,
  #565190,
  #44abac,
  #2ca7d8,
  #1482ce,
  #05597c,
  #b2dd57,
  #57c443,
  #05b853,
  #19962e,
  #fdc82e,
  #fd9c2e,
  #d5385a,
  #911750
);

@keyframes ripple {
  0% {
    background-color: transparent;
  }

  30% {
    background-color: var(--cell-color);
  }

  60% {
    background-color: transparent;
  }

  100% {
    background-color: transparent;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loading {
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 2px;
  height: 100vh;
  justify-content: center;
  position: fixed;
  width: 100%;
  z-index: 9999999;

  .loading-container {
    animation-delay: 700ms;
    animation: 1.5s rotate ease infinite;
  }
}

.line {
  display: flex;
  flex-direction: row;
  gap: 2px;

  div {
    animation: 1.5s ripple ease infinite;
    background: #aaaaaa;
    border-radius: 5px;
    border: 1px solid black;
    height: 40px;
    width: 40px;

    $index: 0;
    $line-delay: 0;
    @each $color in $colors {
      $index: $index + 1;
      @if $index > 12 {
        $line-delay: 900;
      } @else if $index > 8 {
        $line-delay: 600;
      } @else if $index > 4 {
        $line-delay: 300;
      }

      /* ms lines
          100 - 200 - 300 - 400
          200 - 300 - 400 - 500
          300 - 400 - 500 - 600
          400 - 500 - 600 - 700
        */
      &.c-#{$index} {
        --cell-color: #{$color};
        animation-delay: #{100 * $index - $line-delay}ms;
      }
    }
  }
}
</style>
