import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from "../firebase.js";

const db = Firebase.collection("usuarios");

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuarios: []
  },
  mutations: {
    setUsuarios(state, payload){
      state.usuarios = payload
    },

  },
  getters : {
    obtenerUsuarios ( state ) {
      return state.usuarios
    }
  },
  actions: {
    async todosUsuario({ commit }) {
      await db.get().then(querySnapshot => {
        let usuarios = []
        querySnapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          usuarios = [ ...usuarios, doc.data() ]
        });
        commit('setUsuarios', usuarios);
      });
    } ,

    insertarUsuario({ dispatch }, usuario) {
      db.doc().set({
       usuario
      });

      dispatch('todosUsuario')
    } ,


    modificarProducto({ dispatch }, usuario) {
      db.doc(usuario).update({
        nombreCompleto : usuario.nombreCompleto ,
        edad : usuario.edad,
        fechaNacimiento: usuario.fechaNacimiento,
        fechaInscripcion: usuario.fechaInscripcion,
        costo: usuario.costo
      });
      dispatch('todosUsuario')
    } ,

    eliminarProducto({ dispatch }, usuario) {
      db.doc(usuario).delete();
      dispatch('todosUsuario')
    }

  },
  modules: {
  }
})
