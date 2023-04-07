<template>
    <div id="plurali" class="bg-main w-screen h-screen bg-cover bg-no-repeat bg-center flex items-center">
        <div class="container max-w-2xl mx-auto">
            <ErrorAlert v-if="error">
                {{ error }}
            </ErrorAlert>
            <div class="bg-white rounded-2xl shadow-2xl p-8">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {error} from "../store"
import ErrorAlert from '../components/ErrorAlert.vue';

export default defineComponent({
    setup() {
        return {
            error
        };
    },
    components: { ErrorAlert }
})
</script>