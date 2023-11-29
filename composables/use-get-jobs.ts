import { computed } from 'vue'
import { UnwrapRef } from 'vue-demi'
import { useQuery } from 'vue-query'
import { map, zip } from 'lodash'
import Parser from '@/utils/parser'

function sortsParser(sortBy: string | [], sortType: string | []) {
    if (!sortBy) {
        return []
    }

    if (Array.isArray(sortBy)) {
        return map(zip(sortBy, sortType), ([sortBy, sortType]) => {
            return sortType === 'desc' ? `-${sortBy}` : sortBy
        })
    }

    return [sortType === 'desc' ? `-${sortBy}` : sortBy]
}

export default function useGetJobs(params?: UnwrapRef<any>, options?: any) {
    const { $api } = useNuxtApp()
    const query = useQuery(
        ['jobs', params],
        () => {
            const { sortBy, sortType } = params.value
            const sorts = sortsParser(sortBy, sortType)

            const query = new Parser({
                includes: [],
                appends: [],
                fields: {},
                filters: params.value,
                sorts,
                page: params.value.page,
                limit: params.value.rowsPerPage,
                payload: null,
                ...params.value,
            }).query()

            return $api.jobs.getJobs(query)
        },
        {
            refetchOnWindowFocus: false,
            ...options,
        }
    )

    const items = computed(() => query.data.value?.data.content || [])
    const totalItems = computed(() => query.data.value?.data.totalElements || 0)
    const totalPages = computed(() => query.data.value?.data.totalPages || 0)

    return {
        ...query,
        items,
        totalItems,
        totalPages,
    }
}