<template>
    <div class="mb-5">
        <Title>Account settings</Title>
        <Subtitle>Settings of your PluralInfo account</Subtitle>
    </div>

    <form class="mb-4 w-full" @submit.prevent="submit">
        <div class="mb-3.5">
            <Label>Simply Plural API key</Label>
            <input v-model="form.pluralKey" @keyup="validate" class="w-full p-2.5 border rounded-xl border-gray-400"
                placeholder="Simply Plural API key" />
        </div>

        <Button type="submit" class="w-full border border-violet-700 text-violet-700 mb-3.5">
            Update user settings
        </Button>

        <div class="inline-flex w-full justify-start items-center">
            <router-link to="/admin" class="text-gray-500">Go back</router-link>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from 'vue';
import Title from "../../components/Title.vue";
import Subtitle from "../../components/Subtitle.vue";
import Button from "../../components/Button.vue";
import Label from "../../components/Label.vue";
import {updateUser} from "../../api/user";
import {error, user} from "../../store"

export default defineComponent({
    components: {
        Title,
        Subtitle,
        Button,
        Label,
    },
    setup() {
        const form = reactive({
            pluralKey: user.pluralKey ?? '',
        })

        const validate = () => {
            if (!form.pluralKey || form.pluralKey.trim().length < 32) {
                error.value = "Simply Plural Key must be at least 32 characters long."
                return false;
            }

            error.value = null

            return true;
        }

        const submit = async () => {
            try {
                await updateUser(form);
            } catch (e) {
                error.value = e?.response?.data?.error ?? e?.message ?? 'Unknown error has occurred. Please try again.'
            }
        }

        watch(() => user.pluralKey, () => form.pluralKey = user.pluralKey, {immediate: true});

        return {
            validate,
            submit,
            form
        }
    }
})
</script>