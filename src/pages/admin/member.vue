<template>
    <Fetchable :result="data.member" :retry="fetchAll">
        <div class="mb-5 flex gap-2 justify-left items-center gap-4">
            <img v-if="data.member.avatar" :src="data.member.avatar" :alt="data.member.name" class="flex-shrink-0 w-32 h-32 rounded-full object-cover">
            <Color v-else :color="data.member.color ?? '#e2e8f0'" class="flex-shrink-0 w-32 h-32 opacity-25"/>
            <div>
                <p class="text-sm text-gray-700">SID: {{ data.member.id }}</p>
                <Title class="text-violet-700">
                    {{ data.member.name }}
                    <a
                        :href="`/${data.system.data.slug}/${data.member.data.slug}`"
                        class="text-sm text-gray-700 border-b border-b-gray-400 font-normal"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Click to open public view
                    </a>
                </Title>
                <Subtitle class="mb-3">{{ data.member.description ?? 'No description' }}</Subtitle>
                <span v-if="data.member.color" class="inline-flex items-center gap-1">
                        Color: {{ data.member.color }} <ColorCircle :color="data.member.color"/>
                    </span>
            </div>
        </div>

        <CustomFields :fields="data.member.fields" :modifiable="true" :hide-no-values="true" title="System-wide Custom Fields"/>
    </Fetchable>
</template>

<script lang="ts">
import {defineComponent, onBeforeUnmount, onMounted, reactive, ref} from 'vue';
import Title from "../../components/Title.vue";
import Subtitle from "../../components/Subtitle.vue";
import ButtonLink from "../../components/ButtonLink.vue";
import Button from "../../components/Button.vue";
import {bgColor, flash, FlashType} from "../../store";
import Spinner from "../../components/Spinner.vue";
import {Member, System} from "../../api/types";
import {formatError, wrapRequest} from "../../api";
import {getMember, getSystem} from "../../api/system";
import Color from "../../components/global/color/ColorCircle.vue";
import {useRoute} from "vue-router";
import {useGoBack} from "../../composables/goBack";
import Fetchable from "../../components/global/Fetchable.vue";
import CustomFields from "../../components/global/fields/CustomFields.vue";
import ColorCircle from "../../components/global/color/ColorCircle.vue";
import {getRouteParam} from "../../utils";

export default defineComponent({
    components: {
        ColorCircle,
        CustomFields,
        Fetchable,
        Spinner,
        Title,
        Subtitle,
        ButtonLink,
        Button,
        Color
    },
    setup() {
        const data = reactive({
            system: false as System|null|false,
            member: false as Member|null|false
        });

        const route = useRoute()

        useGoBack('/admin/system');

        const fetchAll = async () => {
            if (data.system === null || data.member === null) return;
            data.system = data.member = null;

            let sys = await wrapRequest(getSystem);
            data.system = sys ? sys.system : sys;

            if (sys) {
                let mem = await wrapRequest(() => getMember(getRouteParam(route.params.id)))
                data.member = mem ? mem.member : mem;

                if (data.member && data.member.color) {
                    bgColor.value = data.member.color;
                }
            }
        }

        onMounted(() => fetchAll())

        onBeforeUnmount(() => {
            bgColor.value = null;
        })

        return {
            fetchAll,
            data
        }
    }
})
</script>