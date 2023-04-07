<template>
    <Fetchable :result="member" :retry="fetchMember">
        <MemberSummarry :member="member"/>

        <CustomFields :fields="member.fields" :modifiable="false" title="System-wide Custom Fields"/>
    </Fetchable>
</template>

<script lang="ts">
import {computed, defineComponent, onBeforeUnmount, onMounted, ref} from 'vue';
import Title from "../components/Title.vue";
import Subtitle from "../components/Subtitle.vue";
import ButtonLink from "../components/ButtonLink.vue";
import Button from "../components/Button.vue";
import {bgColor, flash, FlashType} from "../store";
import Spinner from "../components/Spinner.vue";
import {Member, System} from "../api/types";
import {formatError} from "../api";
import {getMember} from "../api/public";
import Color from "../components/global/color/ColorCircle.vue";
import {useRoute} from "vue-router";
import {useGoBack} from "../composables/goBack";
import Fetchable from "../components/global/Fetchable.vue";
import CustomFields from "../components/global/fields/CustomFields.vue";
import ColorCircle from "../components/global/color/ColorCircle.vue";
import {getRouteParam} from "../utils";
import MemberSummarry from "../components/global/members/MemberSummarry.vue";

export default defineComponent({
    components: {
        MemberSummarry,
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
        const member = ref<Member|null|false>(false);

        const route = useRoute()

        const systemId = computed(() => getRouteParam(route.params.systemId));

        useGoBack(`/${systemId.value}`);

        const fetchMember = async () => {
            if (member.value === null) return
            member.value = null;
            try {
                const res = (await getMember(systemId.value, getRouteParam(route.params.memberId))).data
                if (!res.success) throw new Error(res.error);

                if (res.data.member.color) {
                    bgColor.value = res.data.member.color;
                }

                member.value = res.data.member;
            } catch (e) {
                member.value = false;
                flash(formatError(e), FlashType.Danger, true)
            }
        }

        onMounted(() => fetchMember())

        onBeforeUnmount(() => {
            bgColor.value = null;
        })

        return {
            fetchMember,
            member,
            systemId
        }
    }
})
</script>