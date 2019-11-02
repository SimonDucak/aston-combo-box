<template>
  <div
    class="o-combobox"
    :class="{'open': showDropdown}"
  >
    <input
      placeholder="Placeholder"
      class="o-combobox__input"
      type="text"
      @keyup.enter.prevent="select(focusIndex)"
      v-model="searchInput"
      v-closable="{
        exclude: ['ul'],
        handler: 'onClose'
      }"
      @focus="showDropdown = true"
      v-on:keyup.8="onBackspace"
      @keydown.tab="onTab"
      @keydown.down.prevent="focusNext()"
      @keydown.up.prevent="focusPrev()"
    />
    <ul
      class="o-date-list"
      :class="{'hide-dropdown': !showDropdown}"
      ref="ul"
    >
      <li
        v-for="(option, index) in filteredOptions"
        :key="index + 1"
        @click="select(index)"
        @mouseenter="focusIndex = index"
        :class="{'o-date-list__item--active': index == focusIndex, 'selected': index === selectedIndex, 'disabled': option.disable}"
        class="o-date-list__item"
      >
        {{ option.label }}
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  name: 'comboBox',
  props: [
    'options',
    'allowCustomValue',
    'value',
    'categories',
  ],
  data() {
    return {
      showDropdown: false,
      times: [],
      focusIndex: 0,
      searchInput: '',
    };
  },
  computed: {
    filteredOptions() {
      if (!this.categories) {
        return this.options.filter(option => option.label.toLowerCase().indexOf(this.searchInput.toLowerCase()) !== -1);
      }

      return this.mergeCategoriesObject(this.options);
    },
    selectedIndex() {
      if (this.value !== undefined) {
        return this.filteredOptions.findIndex(option => option.label === this.value.label);
      }
      return undefined;
    },
  },
  methods: {
    select(index) {
      if (!this.filteredOptions[index].disable) {
        if (this.filteredOptions.length > 0) {
          this.$emit('combo-change', this.filteredOptions[index]);
          this.showDropdown = false;
          this.searchInput = this.filteredOptions[index].label;
        } else {
          this.setCustomValue('SELECT');
        }
      }
    },
    focusNext() {
      if (this.filteredOptions.length !== this.focusIndex + 1) {
        this.focusIndex += 1;
      }
    },
    focusPrev() {
      if (this.focusIndex !== 0) {
        this.focusIndex -= 1;
      }
    },
    onClose() {
      this.showDropdown = false;
      if (this.searchInput.length === 0) {
        this.$emit('combo-change', { label: '', value: '' });
      }
      this.setCustomValue('CLOSE');
    },
    onTab() {
      this.showDropdown = false;
    },
    onBackspace() {
      this.showDropdown = true;
    },
    mergeCategoriesObject(categoriesObj) {
      const options = categoriesObj.map((obj) => {
        const categoryOptions = obj.categoryOptions.filter(option => option.label.toLowerCase().indexOf(this.searchInput.toLowerCase()) !== -1);
        if (categoryOptions.length > 0) {
          categoryOptions.unshift({ label: obj.categoryName, value: obj.categoryName, disable: true });
        }
        return categoryOptions;
      });

      return [].concat([], ...options);
    },
    setCustomValue(method) {
      let opts = this.options;

      if (this.categories) {
        opts = this.mergeCategoriesObject(this.options);
      }

      if (this.allowCustomValue && method === 'CLOSE') {
        if (opts.every(option => option.label.toLowerCase() === this.searchInput.toLowerCase())) {
          this.$emit('combo-change', {
            label: this.searchInput,
            value: 'CUSTOM_VALUE',
          });
        } else {
          const foundOption = opts.find(option => option.label.toLowerCase() === this.searchInput.toLowerCase());
          this.$emit('combo-change', foundOption);
        }
      }
    },
  },
  watch: {
    filteredOptions() {
      this.focusIndex = 0;
    },
  },
};
</script>

<style lang="less" scoped>
  .hide-dropdown {
    visibility: hidden;
    pointer-events: none;
  }

  .o-combobox {
    width: 300px;
  }

  .open {
    z-index: 200000;
  }

  .disabled {
    background-color: gray;
    opacity: 0.5;
    color: black;
  }

  .selected {
    background-color: red;
    opacity: 1!important;
  }

  .o-combobox__input {
    padding: 0.5rem;
    width: 100%;
    font-size: 15px;
    -webkit-appearance: none;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 3px;
    text-align: left;
    background: white;
  }

  .o-combobox__input:focus {
    box-shadow: none;
    -webkit-appearance: none;
    outline: 0;
  }

  .o-date-list {
    position: absolute;
    width: 100%;
    margin-top: 0.5rem;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.08);
    padding: 0;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

  }

  .o-date-list__item {
    margin: 0;
    list-style-type: none;
    padding: 0.5rem;
    font-size: 14px;

    display: block;

    text-align: center;
    cursor: pointer;

  }

  .o-date-list__item--active {
    opacity: 0.5;
  }
</style>
