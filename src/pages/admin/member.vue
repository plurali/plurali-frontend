<template>
    <div v-if="!loading && member">
        <div class="mb-5 flex gap-4 items-center">
            <img v-if="member.avatar" :src="member.avatar" :alt="member.name" class="flex-shrink-0 w-32 h-32 rounded-full object-cover">
            <Color v-else :color="member.color ?? '#e2e8f0'" class="flex-shrink-0 w-32 h-32 opacity-25"/>
            <div>
                <p class="text-sm text-gray-700">SID: {{ member.id }}</p>
                <Title>{{ member.name }} <span v-if="member.pronouns" class="text-sm text-gray-500">{{member.pronouns}}</span></Title>
                <p>{{ member.description ?? 'No description' }}</p>
            </div>
        </div>

    </div>
    <div v-else-if="member === false" class="inline-flex w-full justify-center items-center">
        <Button class="border border-gray-700 text-gray-700" @click.prevent="fetchMember">Try again</Button>
    </div>
    <div v-else class="inline-flex w-full justify-center items-center">
        <Spinner class="!text-violet-700 w-10 h-10"/>
    </div>
    <div class="inline-flex w-full justify-start items-center">
        <router-link to="/admin/system" class="text-gray-500">Go back</router-link>
    </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeUnmount, onMounted, ref} from 'vue';
import Title from "../../components/Title.vue";
import Subtitle from "../../components/Subtitle.vue";
import ButtonLink from "../../components/ButtonLink.vue";
import Button from "../../components/Button.vue";
import {bgColor, flash, FlashType} from "../../store";
import Spinner from "../../components/Spinner.vue";
import {Member, System} from "../../api/types";
import {formatError} from "../../api";
import {getMember, getMembers, getSystem} from "../../api/system";
import Color from "../../components/Color.vue";
import {useRoute} from "vue-router";

export default defineComponent({
    components: {
        Spinner,
        Title,
        Subtitle,
        ButtonLink,
        Button,
        Color
    },
    setup() {
        const member = ref<Member | null | false>(null);

        const loading = ref(false);

        const route = useRoute()

        const fetchMember = async () => {
            if (loading.value) return;
            loading.value = true;
            member.value = null;
            try {
                const res = (await getMember(Array.isArray(route.params.id) ? route.params.id[0] : route.params.id)).data
                if (!res.success) throw new Error(res.error);

                if (res.data.member.color) {
                    bgColor.value = res.data.member.color;
                }

                member.value = res.data.member;
            } catch (e) {
                member.value = false;
                flash(formatError(e), FlashType.Danger, true)
            }
            loading.value = false;
        }

        onMounted(() => fetchMember())

        onBeforeUnmount(() => {
            bgColor.value = null;
        })

        return {
            fetchMember,
            loading,
            member
        }
    }
})
</script>