<template>
    <div class="page-container">
        <md-app>
            <md-app-toolbar class="md-primary" md-elevation="0">
                <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
                    <md-icon>menu</md-icon>
                </md-button>
                <span class="md-title">{{ title }}</span>
                <md-button class="md-icon-button md-dense md-primary" @click="$router.push('/logout')">
                    <md-icon>exit_to_app</md-icon>
                </md-button>

            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
                <md-toolbar class="md-transparent" md-elevation="0">
                    <span>Navigation</span>

                    <div class="md-toolbar-section-end">
                        <md-button class="md-icon-button md-dense" @click="toggleMenu">
                            <md-icon>keyboard_arrow_left</md-icon>
                        </md-button>
                    </div>
                </md-toolbar>
                <MainMenu :navItems="nav"></MainMenu>
            </md-app-drawer>
            <md-app-content>
                <router-view></router-view>
            </md-app-content>
            <Footer/>
        </md-app>
    </div>
</template>

<script>
  import nav from '@/config/mainMenu';
  import MainMenu from '@/components/base/MainMenuComponent';
  import Footer from '@/components/base/FooterComponent';

    export default {
      name: 'AdminContainer',
      components: {
        MainMenu,
        Footer
      },
      data() {
          return {
              nav: nav.items,
              menuVisible: false
          }
      },
      methods: {
          toggleMenu() {
              this.menuVisible = !this.menuVisible
          },
      },
      computed: {
          title() {
              return this.$route.name
          }
      }
    }
</script>

<style lang="scss" scoped>
    .md-app-toolbar {
        .md-title {
            text-transform: uppercase;
        }
    }

    .md-title {
        flex: 1;
    }

    .md-app {
        min-height: 350px;
        border: 1px solid rgba(#000, .12);
    }

    // Demo purposes only
    .md-drawer {
        width: 250px;
        max-width: calc(100vw - 125px);
    }

    .logout-area {
        float: right;
    }
</style>
