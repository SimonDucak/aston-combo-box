<template>
  <div>
    <div>
      <h4>Combobox output</h4>
      <p>{{comboValue}}</p>
    </div>
    <combo-box
      @combo-change="comboValue = $event"
      :options="options"
      :allowCustomValue="true"
      :value="comboValue"
      :categories="true"
    />
  </div>
</template>

<script>
import comboBox from '../components/comboBox.vue';

export default {
  name: 'Combo',
  components: {
    comboBox,
  },
  data() {
    return {
      comboValue: {},
      // options: [
      //   { name: 'Vue.js', label: 'JavaScript' },
      //   { name: 'BACKEND', label: 'BACKEND', disable: true },
      //   { name: 'Sinatra', label: 'Ruby' },
      //   { name: 'Laravel', label: 'PHP' },
      //   { name: 'Phoenix', label: 'Elixir' },
      // ],
      options: [
        {
          categoryName: 'Backend',
          categoryOptions: [
            { value: 'JAVA', label: 'Java' },
            { value: 'PYTHON', label: 'Python' },
            { value: 'PHP', label: 'PHP' },
          ],
        },
        {
          categoryName: 'Frontend',
          categoryOptions: [
            { value: 'VUE', label: 'Vue' },
            { value: 'REACT', label: 'React' },
            { value: 'ANGULAR', label: 'Angulat' },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
