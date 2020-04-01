<template>
    <div class="centered-container login">
        <div class="background"></div>
        <md-content class="md-elevation-3">
          <div class="title">
              <div class="md-title">VUE BOILERPLATE DEMO</div>
          </div>
          <form @submit.prevent="handleSubmit">
              <div class="form">
                  <md-field :class="getValidationClass('email')">
                      <label>E-mail</label>
                      <md-input type="text " autocomplete="off" v-model="email" name="email"></md-input>
                      <span class="md-error" v-if="!$v.email.required">Email is required</span>
                      <span class="md-error" v-if="!$v.email.email">Invalid Email format</span>
                  </md-field>

                  <md-field :class="getValidationClass('password')">
                      <label>Password</label>
                      <md-input type="password" v-model="password" name="password"></md-input>
                      <span class="md-error" v-if="!$v.password.required">Password is required</span>
                  </md-field>
              </div>
              <div class="actions md-layout md-alignment-center-space-between">
                  <md-button type="submit" class="md-raised md-primary ">Log in</md-button>
              </div>
          </form>


        </md-content>
    </div>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {
        required,
        email,
    } from 'vuelidate/lib/validators'

    export default {
      name: "Login",
      mixins: [validationMixin],
      data() {
        return {
          loading: false,
          email: '',
          password: '',
          submitted: false
        }
      },
      validations: {
        email: {
          email,
          required,
        },
        password: {
          required,
        }
      },
      computed: {
        loggingIn() {
          return this.$store.state.authentication.status.loggingIn;
        }
      },

      //hook can be used to run code after an instance is created
      created() {
          // reset login status
      },
      methods: {
        getValidationClass(fieldName) {
          const field = this.$v[fieldName];
          if (field) {
            return {
              'md-invalid': field.$invalid && field.$dirty
            }
          }
        },
        handleSubmit(e) {
          this.submitted = true;
          const {email, password} = this;
          const {dispatch} = this.$store;
          this.$v.$touch();
          if (!this.$v.$invalid) {
            dispatch('authentication/login', {email, password})
            .then((response) => {
               console.log(response);
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => {
    
            });
          }
        }
      }
    };
</script>

<style lang="scss">
   
  .centered-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 100vh;
    .title {
      text-align: center;
      margin-bottom: 30px;
    }
    .actions {
      .md-button {
          margin: 0;
      }
    }
    .form {
      margin-bottom: 60px;
    }
    .md-content {
      z-index: 1;
      padding: 40px;
      margin: 15px;
      width: 100%;
      max-width: 400px;
      position: relative;
    }
  }
</style>
