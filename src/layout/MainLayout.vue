<template>
    <the-nav-bar></the-nav-bar>
    <div class="container with-nav">
        <app-message></app-message>
        <router-view />
    </div>
</template>

<script>
import TheNavBar from '../components/TheNavBar.vue'
import AppMessage from '../components/ui/AppMessage.vue'

export default {
    components: {
        TheNavBar,
        AppMessage
    }
}
</script>

