<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import type { LocaleObject } from '#i18n'

const userSettings = useUserSettings()

const { locales: _locales } = useI18n() as { locales: ComputedRef<LocaleObject[]> }
const locales = computed(() => _locales.value.filter(locale => locale.code !== 'DEFAULT'))
</script>

<template>
  <select v-model="userSettings.language">
    <option v-for="item in locales" :key="item.code" :value="item.code" :selected="userSettings.language === item.code">
      {{ item.name }}
    </option>
  </select>
</template>
