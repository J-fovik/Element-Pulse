<script lang="ts" setup>
import TagList from './TagList/index.vue'
</script>
<template>
  <div class="app-tagsview">
    <TagList />
  </div>
</template>
<style lang="scss">
.app-tagsview {
  white-space: nowrap;
  width: 100%;
  height: 36px;
  line-height: 36px;
  border-bottom: 1px solid var(--color-border-2);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  background: var(--color-menu-light-bg);
  overflow: hidden;
  .tags-wrap {
    display: flex;
    & > li {
      &:first-of-type {
        margin-left: 15px;
        border-left: 1px solid var(--color-border-2);
        .arco-tag {
          border: 0;
        }
      }
      &:last-of-type {
        margin-right: 15px;
        border-right: 1px solid var(--color-border-2);
      }
      &.tag-home {
        .arco-tag {
          padding: 0 13px;
        }
        svg {
          width: 1em;
        }
      }
    }
    .arco-tag {
      line-height: 36px;
      height: 36px;
      margin-right: 0;
      border: 0;
      border-left: 1px solid var(--color-border-2);
      border-radius: 0;
      padding: 0 12px;
      cursor: pointer;
      background-color: var(--color-bg-1);
      vertical-align: inherit;
      svg {
        width: 0;
        transition: all 0.15s;
      }
      &:hover {
        svg {
          width: 1em;
        }
        background-color: var(--color-border-1);
        .anticon-close {
          opacity: 1;
        }
      }
      .arco-tag-close-btn {
        color: #999;
        opacity: 0.6;
        position: relative;
        left: 3px;
        &:hover {
          color: #666;
          border-radius: 10px;
          background-color: #ccc;
          opacity: 1;
        }
      }
    }
    .tag-active {
      svg {
        width: 1em;
      }
      .arco-tag {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        .arco-tag-close-btn {
          color: #fff;
          &:hover {
            color: #333;
            background-color: #fff;
          }
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 0px 16px;
      height: 30px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
