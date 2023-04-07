<template>
    <div class="mb-5">
        <Title>PluralInfo</Title>
        <Subtitle>Informative page about your system and it's members you can share with people!</Subtitle>
    </div>

    <div class="inline-flex items-center gap-2">
        <ButtonLink to="/admin/user" class="bg-violet-700 text-white">User settings</ButtonLink>

        <ButtonLink to="/admin/system" class="bg-violet-700 text-white">System</ButtonLink>

        <Button @click.prevent="logout" class="border border-violet-700 text-violet-700">Logout</Button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Title from "../../components/Title.vue";
import Subtitle from "../../components/Subtitle.vue";
import ButtonLink from "../../components/ButtonLink.vue";
import Button from "../../components/Button.vue";
import {logout as apiLogout} from "../../api/auth";
import {flash, FlashType} from "../../store";
import { useRouter } from 'vue-router';

export default defineComponent({
    components: {
        Title,
        Subtitle,
        ButtonLink,
        Button,
    },
    setup() {
        const router = useRouter();

        const logout = async () => {
            try {
                await apiLogout();
            } catch (e) {
                flash(
                    (e as any)?.response?.data?.error ?? (e as any)?.message ?? 'Unknown error has occurred. Please try again.',
                    FlashType.Danger
                )
            }
            router.push("/auth/login")
        }

        return {logout}
    }
})
</script>