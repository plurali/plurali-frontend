<template>
    <div class="mb-5">
        <Title>Login</Title>
        <Subtitle>Login to your PluralInfo account</Subtitle>
    </div>

    <form class="mb-4 w-full" @submit.prevent="submit">
        <div class="mb-3.5">
            <Label>Your username</Label>
            <input v-model="form.username" @keyup="validate" class="w-full p-2.5 border rounded-xl border-gray-400"
                placeholder="Your username" />
        </div>

        <div class="mb-3.5">
            <Label>Your password</Label>
            <input v-model="form.password" @keyup="validate" class="w-full p-2.5 border rounded-xl border-gray-400"
                placeholder="*************" />
        </div>

        <Button type="submit" class="w-full border border-violet-700 text-violet-700 mb-3.5">
            Login
        </Button>

        <div class="inline-flex w-full justify-end items-center">
            <router-link to="/auth/register" class="text-gray-500">Don't have an account yet?</router-link>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router'
import Title from "../../components/Title.vue";
import Subtitle from "../../components/Subtitle.vue";
import Button from "../../components/Button.vue";
import Label from "../../components/Label.vue";
import {login} from "../../api/auth";
import {error} from "../../store"

export default defineComponent({
    components: {
        Title,
        Subtitle,
        Button,
        Label,
    },
    setup() {
        const router = useRouter();

        const form = reactive({
            username: '',
            password: ''
        });

        const validate = () => {
            if (!form.username || form.username.trim().length < 3) {
                error.value = "Username must be at least 3 characters long."
                return false;
            }

            console.log("aaa")

            if (!form.password || form.password.trim().length < 4) {
                error.value = "Password must be at least 4 characters long."
                return false;
            }

            error.value = null

            return true;
        }

        const submit = async () => {
            try {
                await login(form);
                router.push("/admin")
            } catch (e) {
                error.value = e?.response?.data?.error ?? e?.message ?? 'Unknown error has occurred. Please try again.'
            }
        }

        return {
            form,
            validate,
            submit
        }
    }
})
</script>