<template>
    <Fetchable :retry="fetchSystem" :result="system">
        <SystemSummary :system="system"/>

        <CustomFields :fields="system.fields" :modifiable="true"/>

        <Members/>
    </Fetchable>
</template>

<script lang="ts">
import {defineComponent, onBeforeUnmount, onMounted, ref} from 'vue';
import Title from "../../components/Title.vue";
import Subtitle from "../../components/Subtitle.vue";
import {bgColor, flash, FlashType} from "../../store";
import {System} from "../../api/types";
import {formatError} from "../../api";
import {getSystem} from "../../api/system";
import ColorCircle from "../../components/global/color/ColorCircle.vue";
import CustomFields from "../../components/global/fields/CustomFields.vue";
import Members from "../../components/admin/members/Members.vue";
import Fetchable from "../../components/global/Fetchable.vue";
import {useGoBack} from "../../composables/goBack";
import Color from "../../components/global/color/ColorCircle.vue";
import SystemSummary from "../../components/global/system/SystemSummary.vue";

export default defineComponent({
    components: {
        SystemSummary,
        Color,
        Fetchable,
        Members,
        CustomFields,
        Title,
        Subtitle,
        ColorCircle
    },
    setup() {
        const system = ref<System | null | false>(null);

        useGoBack('/admin')

        const fetchSystem = async () => {
            system.value = null;
            try {
                const res = (await getSystem()).data;
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
            system,
        }
    }
})
</script>