<template>
  <v-app>
    <v-app-bar
      color="primary"
      dark
    >

    </v-app-bar>

    <v-main>
      <CrudFirebase/>
    </v-main>
  </v-app>
</template>

<script>
import CrudFirebase from './components/CRUDFirebase';

export default {
  name: 'App',

  components: {
    CrudFirebase,
  },

  data: () => ({
    //
  }),
};
</script>
