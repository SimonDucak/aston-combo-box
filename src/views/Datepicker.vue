<template>
  <section>
    <vue-date-picker
      v-model="selectedDate"
      :fullscreenMobile="true"
    />
  </section>
</template>

<script>
import { VueDatePicker } from '@mathieustan/vue-datepicker';

export default {
  name: 'Datepicker',
  components: {
    VueDatePicker,
  },
  data() {
    return {
      selectedDate: new Date(),
    };
  },
};
</script>
