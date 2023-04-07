<template>
    <div class="mb-5">
        <Title>Account settings</Title>
        <Subtitle>Settings of your PluralInfo account</Subtitle>
    </div>

    <form class="mb-4 w-full" @submit.prevent="submit">
        <div class="mb-3.5">
            <Label>Simply Plural API key</Label>
            <input :disabled="loading" v-model="form.pluralKey" @keyup="validate" class="w-full p-2.5 border rounded-xl border-gray-400"
                placeholder="Simply Plural API key" />
        </div>

        <div class="mb-3.5" v-if="user.admin">
            <Label>Override Plural ID</Label>
            <input :disabled="loading" v-model="form.overridePluralId" @keyup="validate" class="w-full p-2.5 border rounded-xl border-gray-400"
                   placeholder="Override Plural ID" />
        </div>

        <Button :disabled="loading" type="submit" class="w-full border border-violet-700 text-violet-700 mb-3.5">
            <p v-if="!loading">Update user settings</p>
            <Spinner v-else/>
        </Button>

        <div class="inline-flex w-full justify-start items-center">
            <router-link to="/admin" class="text-gray-500">Go back</router-link>
        </div>
    </form>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from 'vue';
import Title from "../../components/Title.vue";
import Subtitle from "../../components/Subtitle.vue";
import Button from "../../components/Button.vue";
import Label from "../../components/Label.vue";
import {updateUser} from "../../api/user";
import {clearFlashes, flash, FlashType, user} from "../../store"
import Spinner from "../../components/Spinner.vue";
import {formatError} from "../../api";

export default defineComponent({
    components: {
        Spinner,
        Title,
        Subtitle,
        Button,
        Label,
    },
    setup() {
        const form = reactive({
            pluralKey: user.value?.pluralKey ?? '',
            overridePluralId: user.value?.overridePluralId ?? '',
        })

        const formErrors = reactive({
            pluralKey: null as string|null,
        })

        const loading = ref(false);

        const validate = () => {
            formErrors.pluralKey = !form.pluralKey || form.pluralKey.trim().length < 32
                ? "Key must be at least 32 characters long."
                : null;

            return !formErrors.pluralKey
        }

        const submit = async () => {
            if (loading.value) return;
            loading.value = true
            clearFlashes();
            try {
                await updateUser(form);
                flash("Changes saved!", FlashType.Success, true)
            } catch (e) {
                flash(formatError(e), FlashType.Danger, true)
            }
            loading.value = false
        }

        return {
            form,
            formErrors,
            loading,
            validate,
            submit,
            user,
        }
    }
})
</script>