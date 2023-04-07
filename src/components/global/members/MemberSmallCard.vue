<template>
    <router-link
            :to="$route.path.startsWith('/admin') ? `/admin/member/${member.id}` : `${$route.fullPath}/${member.data.slug}`"
            class="px-4 py-2 border border-l-4 rounded-2xl text-sm flex items-center gap-4"
            :class="isAdmin ? member.data.visible ? 'border-l-green-500' : 'border-l-red-500' : ''"
            :style="(!isAdmin && member.color) ? {borderLeftColor: member.color} : {}"
    >
        <img v-if="member.avatar" :src="member.avatar" :alt="member.name"
             class="w-16 h-16 rounded-full object-cover">
        <Color v-else :color="member.color ?? '#e2e8f0'" class="flex-shrink-0 w-16 h-16 opacity-25"/>
        <div>
            <h2 class="text-xl font-medium">
                {{ member.name }}
                <span v-if="member.pronouns" class="text-sm text-gray-500 font-normaly">{{ member.pronouns }}</span>
            </h2>
            <h3 class="text-gray-700">{{ member.description }}</h3>
        </div>
    </router-link>
</template>
<script lang="ts">
import Color from "../color/ColorCircle.vue";
import {computed, defineComponent, PropType} from "vue";
import {Member} from "../../../api/types";
import {useRoute} from "vue-router";

export default defineComponent({
    components: {
        Color
    },
    props: {
        member: {
            type: Object as PropType<Member>,
            required: true,
        }
    },
    setup() {
        const route = useRoute();
        return {
            isAdmin: computed(() => route.path.startsWith('/admin'))
        }
    }
})
</script>