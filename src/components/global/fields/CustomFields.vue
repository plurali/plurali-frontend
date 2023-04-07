<template>
    <div v-if="fields.length >= 1" class="mb-5">
        <p class="inline-flex items-center gap-1 mb-3">{{ title ?? 'Custom Fields' }} ({{ customFields.length }}):</p>

        <div class="grid grid-cols-3 gap-2">
            <CustomField :modifiable="modifiable" v-for="field of customFields.sort((a,b) => a.position > b.position)"
                         :field="field"/>
        </div>
    </div>
</template>
<script lang="ts">
import CustomField from "./CustomField.vue";
import {defineComponent, PropType, ref} from "vue";
import {MemberField, MemberFieldWithValue} from "../../../api/types";
import Fetchable from "../Fetchable.vue";

export default defineComponent({
    props: {
        fields: {
            type: Array as PropType<(MemberField|MemberFieldWithValue)[]>,
            required: true
        },
        modifiable: {
            type: Boolean,
            default: () => false
        },
        title: {
            type: String
        }
    },
    components: {
        Fetchable,
        CustomField
    },
    setup({fields: _fields}) {
        const customFields = ref<(MemberField|MemberFieldWithValue)[] | null | false>(_fields);

        return {
            customFields,
        }
    }
})
</script>