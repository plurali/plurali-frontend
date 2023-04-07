<template>
    <div class="mb-5 flex gap-2 justify-left items-center gap-4">
        <img v-if="system.avatar" :src="system.avatar" :alt="system.username"
             class="flex-shrink-0 w-32 h-32 rounded-full object-cover">
        <Color v-else :color="system.color ?? '#e2e8f0'" class="flex-shrink-0 w-32 h-32 opacity-25"/>
        <div>
            <p class="text-sm text-gray-700" v-if="isAdmin">SID: {{ system.id }}</p>
            <PageTitle class="text-violet-700">
                {{ system.username }}
                <a
                        v-if="isAdmin"
                        :href="`/${system.data.slug}`"
                        class="text-sm text-gray-700 border-b border-b-gray-400 font-normal"
                        target="_blank"
                        rel="noopener noreferrer"
                >
                    Click to open public view
                </a>
            </PageTitle>
            <Subtitle class="mb-3">{{ system.description ?? 'No description' }}</Subtitle>
            <span v-if="system.color" class="inline-flex items-center gap-1">
                        Color: {{ system.color }} <ColorCircle :color="system.color"/>
                    </span>
        </div>
    </div>
</template>
<script lang="ts">
import PageTitle from "../../Title.vue";
import Color from "../color/ColorCircle.vue";
import Subtitle from "../../Subtitle.vue";
import ColorCircle from "../color/ColorCircle.vue";
import {computed, defineComponent, PropType} from "vue";
import {System} from "../../../api/types";
import {useRoute} from "vue-router";

export default defineComponent({
    components: {
        PageTitle,
        Color,
        Subtitle,
        ColorCircle
    },
    props: {
        system: {
            type: Object as PropType<System>,
            required: true
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