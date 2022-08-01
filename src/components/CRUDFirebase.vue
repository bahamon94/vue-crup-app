<template>
  <v-app>
    <v-content class="container px-1">
      <h2 class="font-weight-bold mb-2">
        Vuetify CRUD Example
      </h2>
      <v-card>
        <v-data-table
            :headers="headers"
            :items="obtenerUsuarios"
            mobile-breakpoint="800"
            class="elevation-0">
          <template v-slot:item.actions="{ item }">
            <div class="text-truncate">
              <v-icon
                  small
                  class="mr-2"
                  @click="showEditDialog(item)"
                  color="primary"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                  small
                  @click="deleteItem(item)"
                  color="pink"
              >
                mdi-delete
              </v-icon>
            </div>
          </template>
          <template v-slot:item.details="{ item }">
            <div class="text-truncate" style="width: 180px">
              {{ item.Details }}
            </div>
          </template>
          <template v-slot:item.url="{ item }">
            <div class="text-truncate" style="width: 180px">
              <a :href="item.URL" target="_new">{{ item.URL }}</a>
            </div>
          </template>
        </v-data-table>

        <!-- this dialog is used for both create and update -->
        <v-dialog v-model="dialog" max-width="50%">
          <template v-slot:activator="{ on }">
            <div class="d-flex">
              <v-btn color="success" dark class="ml-auto ma-3" v-on="on">
                Nuevo
                <v-icon small>mdi-plus-circle-outline</v-icon>
              </v-btn>
            </div>
          </template>
          <v-card>
            <v-card-title>
              <span v-if="editedItem.id">Edit {{ editedItem.id }}</span>
              <span class="font-weight-bold" v-else>Insertar nuevo usuario</span>
            </v-card-title>
            <v-card-text>
              <v-row>

                <v-col cols="12" sm="6">
                  <v-text-field
                      :rules="rules"
                      v-model="editedItem.nombre"
                      label="Name">

                  </v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                      :rules="rules"
                      v-model="editedItem.apellido"
                      label="Apellido">
                  </v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field v-model="editedItem.edad" label="Edad"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-menu
                      ref="menuf"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="fechaNacimiento"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          v-model="fechaNacimiento"
                          label="Fecha de Nacimiento"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="fechaNacimiento"
                        no-title
                        scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                          text
                          color="primary"
                          @click="menu = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                          text
                          color="primary"
                          @click="$refs.menuf.save(fechaNacimiento)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12" sm="6">

                  <v-menu
                      ref="menui"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :return-value.sync="fechaInscripcion"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          v-model="fechaInscripcion"
                          label="Fecha de Inscripción"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="fechaInscripcion"
                        no-title
                        scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                          text
                          color="primary"
                          @click="menu2 = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                          text
                          color="primary"
                          @click="$refs.menui.save(fechaInscripcion)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field v-model="editedItem.costo" label="Costo" readonly></v-text-field>
                </v-col>


              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="showEditDialog()">Cancelar</v-btn>
              <v-btn color="blue darken-1" dark @click="guardar(editedItem)">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
import {mapGetters, mapActions} from "vuex";


export default {
  name: "CRUDFirebase",
  data() {
    return {
      rules: [
        value => !!value || 'Required.',
        value => (value && value.length <= 4) || 'Max 4 characters',
      ],
      headers: [
        {text: 'Nombre Completo', value: 'nombreCompleto'},
        {text: 'Edad', value: 'edad'},
        {text: 'Fecha de nacimiento', value: 'fechaNacimiento', width: "100"},
        {text: 'Fecha Inscripción', value: 'fechaInscripcion', width: "180"},
        {text: 'costo', value: 'costo', width: "180"},
        {text: 'Action', value: 'actions', sortable: false},
      ],
      dialog: false,
      editedItem: {},
      fechaNacimiento: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      fechaInscripcion: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
    }
  },
  mounted() {
    this.todosUsuario()
  },
  computed: {
    ...mapGetters([
      'obtenerUsuarios'
    ])
  },
  methods: {
    ...mapActions(['insertarUsuario', 'todosUsuario']),
    showEditDialog(item) {
      this.editedItem = item || {}
      this.dialog = !this.dialog
    },

    guardar() {
      const usuario = {
        ...this.editedItem,
        fechaNacimiento: this.fechaNacimiento,
        fechaInscripcion: this.fechaInscripcion
      }
      this.insertarUsuario(usuario)
    }
  },
}
</script>

<style scoped>
table {
  display: table;
  width: 50%;
  margin: 0 auto;
}

table, th, td {
  border: 1px solid black;
}
</style>
