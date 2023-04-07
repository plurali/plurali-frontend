<template>
    <div
        @click.prevent="toggleVisibility"
        class="px-4 py-3 border border-l-4 rounded-2xl block transition cursor-pointer"
        :class="[isAdmin ? customField.data.visible ? 'border-l-green-500' : 'border-l-red-500' : '', loading && 'bg-gray-200']"
    >
        <p class="font-medium">{{ customField.name }}</p>
        <p v-if="customField.value" class="text-gray-500">{{ customField.value }}</p>
    </div>
</template>
<script lang="ts">

import {computed, defineComponent, PropType, ref} from "vue";
import {MemberField, MemberFieldWithValue} from "../../../api/types";
import {flash, FlashType} from "../../../store";
import {formatError} from "../../../api";
import {updateField} from "../../../api/system";
import customFields from "./CustomFields.vue";
import {useRoute} from "vue-router";

export default defineComponent({
    model: {
        prop: 'field',
        event: 'change',
    },
    props: {
        field: {
            type: Object as PropType<MemberField|MemberFieldWithValue>,
            required: true
        },
        modifiable: {
            type: Boolean,
            default: () => false,
        }
    },
    setup: function ({field: _field, modifiable}) {
        const customField = ref<MemberField|MemberFieldWithValue>(_field);

        const loading = ref(false);

        const route = useRoute()

        const toggleVisibility = async () => {
            if (!modifiable || loading.value) return;
            loading.value = true;

            try {
                const res = (await updateField(customField.value.fieldId, {visible: !customField.value.data.visible})).data;
                if (!res.success) throw new Error(res.error)

                customField.value = {
                    ...res.data.field,
                    ...((customField.value as any).value ? {value: (customField.value as any).value} : {})
                };
                loading.value = false;
            } catch (e) {
                flash(formatError(e), FlashType.Danger, true)
                loading.value = false;
            }
        }

        return {
            toggleVisibility,
            customField,
            loading,
            isAdmin: computed(() => route.path.startsWith('/admin'))
        }
    }
})
</script>