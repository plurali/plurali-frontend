<template>
    <div v-if="!loadingSystem && system">
        <div class="mb-5">
            <p class="text-sm text-gray-700">SID: {{ system.id }}</p>
            <Title>{{ system.username }}</Title>
            <Subtitle>{{ system.description ?? 'No description' }}</Subtitle>
        </div>
        <div class="mb-5">
            <span v-if="system.color" class="inline-flex items-center gap-1">Color: {{ system.color }} <Color
                    :color="system.color"/></span>
        </div>

        <div class="mb-5">
            <span v-if="system.fields.length >= 1"
                  class="inline-flex items-center gap-1">Custom Fields ({{ system.fields.length }}):</span>

            <div class="grid grid-cols-3 gap-1">
                <div v-for="field of system.fields.sort((a,b) => a.position > b.position)"
                     class="px-4 py-2 border rounded-2xl text-sm">
                    {{ field.name }}
                </div>
            </div>
        </div>

        <div v-if="!loadingMembers && members" class="grid grid-cols-2 gap-1 mb-5">
            <div v-for="member of members" class="px-4 py-2 border rounded-2xl text-sm">
                <h2 class="text-xl">{{ member.name }}</h2>
                <h3 class="text-gray-700">{{ member.description }}</h3>
            </div>
        </div>
        <div v-else-if="members === false" class="inline-flex w-full justify-center items-center">
            <Button class="border border-gray-700 text-gray-700" @click.prevent="fetchMembers">Show members</Button>
        </div>
        <div v-else class="inline-flex w-full justify-center items-center">
            <Spinner class="!text-violet-700 w-10 h-10"/>
        </div>
    </div>
    <div v-else-if="system === false" class="inline-flex w-full justify-center items-center">
        <Button class="border border-gray-700 text-gray-700" @click.prevent="fetchSystem">Try again</Button>
    </div>
    <div v-else class="inline-flex w-full justify-center items-center">
        <Spinner class="!text-violet-700 w-10 h-10"/>
    </div>
    <div class="inline-flex w-full justify-start items-center">
        <router-link to="/admin" class="text-gray-500">Go back</router-link>
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
import {getMembers, getSystem} from "../../api/system";
import Color from "../../components/Color.vue";

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
        const system = ref<System | null | false>(null);

        const members = ref<Member[] | null | false>(null);

        const loadingSystem = ref(false);

        const loadingMembers = ref(false);

        const fetchSystem = async () => {
            if (loadingSystem.value) return;
            loadingSystem.value = true;
            loadingMembers.value = false;
            system.value = null;
            members.value = false;
            try {
                const res = (await getSystem()).data
                if (!res.success) throw new Error(res.error);

                if (res.data.system.color) {
                    bgColor.value = res.data.system.color;
                }

                system.value = res.data.system;
            } catch (e) {
                flash(formatError(e), FlashType.Danger, true)
            }
            loadingSystem.value = false;
        }

        const fetchMembers = async () => {
            if (loadingMembers.value) return;
            loadingMembers.value = true;
            members.value = null;
            try {
                const res = (await getMembers()).data
                if (!res.success) throw new Error(res.error);

                members.value = res.data.members;
            } catch (e) {
                flash(formatError(e), FlashType.Danger, true)
            }
            loadingMembers.value = false;
        }

        onMounted(() => fetchSystem())

        onBeforeUnmount(() => {
            bgColor.value = null;
        })

        return {
            fetchSystem,
            fetchMembers,
            loadingSystem,
            loadingMembers,
            system,
            members
        }
    }
})
</script>