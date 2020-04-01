<template>
    <md-list>
        <template v-for="(item, keyItem) in navItems">
            <template v-if="item.children">
                <md-list-item md-expand>
                  <span class="md-list-item-text">{{item.name}}</span>
                  <md-list slot="md-expand">
                    <template v-for="(child, keyChild) in item.children">
                        <md-list-item class="md-inset">
                            {{child.name}}
                        </md-list-item>
                    </template>
                  </md-list>
                </md-list-item>
            </template>
            <template v-else>
                <md-list-item :to="item.url">
                  <md-icon>{{item.icon}}</md-icon>
                  <span class="md-list-item-text">
                    {{item.name}}
                  </span>
                </md-list-item>
            </template>
        </template>
    </md-list>
</template>

<script>
    export default {
      name: 'MainMenu',
      props: {
        navItems: {
          type: Array,
          required: true,
          default: () => []
        }
      },
      data() {
        return {
          expandNews: false,
          expandSingle: false
        }
      }
    }
</script>