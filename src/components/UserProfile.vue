<template>
  <div class="q-pa-md">
    <q-btn  class="text-primary bg-white" :label="userName">
      <q-menu>
        <div class="row no-wrap q-pa-md">
          <div class="column">
            <div class="text-h6 q-mb-md">
              {{ userName }}
            </div>
            <q-toggle v-model="darkMode" :label="i18n.t('darkMode')" />
          </div>

          <q-separator vertical inset class="q-mx-lg" />

          <div class="column items-center">
            <q-avatar size="72px">
              <img src="https://cdn.quasar.dev/img/avatar4.jpg">
            </q-avatar>

            <div class="text-subtitle1 q-mt-md q-mb-xs">{{ userName }}</div>

            <q-btn
              color="primary"
              :label="i18n.t('logout')"
              :href="logout"
              push
              size="sm"
              v-close-popup
            />
          </div>
        </div>
      </q-menu>
    </q-btn>
  </div>
</template>

<script setup>
import { inject, onMounted, ref, watch } from "vue";
import { useQuasar } from "quasar";
import { multiTenancy, realm } from '../components/variables.js';

const $q = useQuasar();
const i18n = inject("i18n");
const keycloak = inject("keycloak");
const userName = ref('')
const darkMode = ref(false)
const logout = `/auth/realms/${multiTenancy ? $q.localStorage.getItem("multiTenancyRealm") : realm}/protocol/openid-connect/logout`

onMounted(async () => {
  const { family_name, preferred_username } = await keycloak.getUser()
  userName.value = family_name || preferred_username
  darkMode.value = $q.localStorage.getItem("darkMode") || $q.dark.isActive
});
watch(darkMode, async (val) => {
  $q.dark.set(val)
  $q.localStorage.set("darkMode", val);
});
</script>
