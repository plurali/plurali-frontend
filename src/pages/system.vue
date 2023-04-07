<template>
    <Fetchable :retry="fetchSystem" :result="system">
        <SystemSummary :system="system"/>

        <CustomFields :fields="system.fields" :modifiable="false"/>

        <Members/>
    </Fetchable>
</template>

<script lang="ts">
import {defineComponent, onBeforeUnmount, onMounted, ref} from 'vue';
import Title from "../components/Title.vue";
import Subtitle from "../components/Subtitle.vue";
import ButtonLink from "../components/ButtonLink.vue";
import Button from "../components/Button.vue";
import {bgColor, flash, FlashType} from "../store";
import Spinner from "../components/Spinner.vue";
import {System} from "../api/types";
import {formatError} from "../api";
import Color from "../components/global/color/ColorCircle.vue";
import {useRoute} from "vue-router";
import {useGoBack} from "../composables/goBack";
import Fetchable from "../components/global/Fetchable.vue";
import CustomFields from "../components/global/fields/CustomFields.vue";
import Members from "../components/front/members/Members.vue";
import ColorCircle from "../components/global/color/ColorCircle.vue";
import {getSystem} from "../api/public";
import SystemSummary from "../components/global/system/SystemSummary.vue";
import {getRouteParam} from "../utils";

export default defineComponent({
    components: {
        SystemSummary,
        ColorCircle, Members, CustomFields,
        Fetchable,
        Spinner,
        Title,
        Subtitle,
        ButtonLink,
        Button,
        Color
    },
    setup() {
        const system = ref<System | null | false>(false);

        const route = useRoute()

        const fetchSystem = async () => {
            if (system.value === null) return;
            system.value = null;
            try {
                const res = (await getSystem(getRouteParam(route.params.systemId))).data
                if (!res.success) throw new Error(res.error);

                if (res.data.system.color) {
                    bgColor.value = res.data.system.color;
                }

                system.value = res.data.system;
            } catch (e) {
                system.value = false;
                flash(formatError(e), FlashType.Danger, true)
            }
        }

        onMounted(() => fetchSystem())

        onBeforeUnmount(() => {
            bgColor.value = null;
        })

        return {
            fetchSystem,
            system
        }
    }
})
</script>