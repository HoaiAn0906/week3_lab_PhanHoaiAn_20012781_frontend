<script setup>
import useGetJobs from "~/composables/use-get-jobs";
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import { useToast } from "vue-toastification";
import {useQueryClient} from "vue-query";
import filters from "@/plugins/filters/currency";

definePageMeta({
  layout: 'admin',
})

const page = ref({title: 'Product List'})
const breadcrumbs = ref([
  {
    title: 'Admin',
    disabled: false,
    to: '/admin',
  },
  {
    title: 'Products',
    disabled: true,
  },
])
const search = ref('')
const dialog = ref(false)
const valid = ref(true)
const editedIndex = ref(-1)
const { $api } = useNuxtApp()
const loading = ref(false)
const toast = useToast()
const queryClient = useQueryClient()
const company_choices = ref([])
const skills_choices = ref([])

const headers = [
  {
    title: 'Job Name',
    align: 'start',
    key: 'jobName',
  },
  {
    title: 'Job Desc',
    align: 'center',
    key: 'jobDesc',
  },
  {
    title: 'Skills',
    align: 'start',
    key: 'skills',
  },
  {
    title: 'Company',
    align: 'start',
    key: 'company.comp_name',
  },
  {
    title: 'Action',
    align: 'center',
    key: 'action',
  },
]

const editedItem = ref({
  id: null,
  jobName: '',
  jobDesc: '',
  company: null,
  skills: [],
})

const defaultItem = ref({
  id: null,
  jobName: '',
  jobDesc: '',
  company: null,
  skills: [],
})

const queryBuilder = ref({
  filters: {
    q: search.value,
  },
  sorts: ['-created_at'],
  page: 1,
  limit: 20,
})

const {items, totalItems, isLoading, isFetching, refetch} = useGetJobs(queryBuilder)

const filterOnlyCapsText = (value, query, item) => {
  return value != null &&
      query != null &&
      typeof value === 'string' &&
      value.toString().toLocaleUpperCase().indexOf(query) !== -1
}

const updateItemsPerPage = (itemsPerPage) => {
  queryBuilder.value.limit = itemsPerPage
  refetch
}

const formTitle = computed(() => {
  return editedIndex.value === -1 ? 'New Job' : 'Edit Job'
})

const save = () => {
  loading.value = true
  //form data
  $api.jobs.createJob(editedItem.value)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        loading.value = false
        queryClient.invalidateQueries('jobs')
      })
  close()
}

const close = () => {
  dialog.value = false
  setTimeout(() => {
    editedItem.value = Object.assign({}, defaultItem.value)
    editedIndex.value = -1
  }, 300)
}

const editItem = (item) => {
  editedIndex.value = items.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  editedItem.value.company = item.company.id
  editedItem.value.skills = item.skills.map((item) => {
    return item.id
  })
  dialog.value = true
}

const deleteItem = (item) => {
  if (confirm('Are you sure you want to delete this item?') === false) {
    return false;
  } else {
    $api.jobs.deleteJob(item.id)
        .then((res) => {
          toast.success(res.message)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          queryClient.invalidateQueries('jobs')
        })
  }
}

const featCompanies = async () => {
  const params = {
    page: 1,
    limit: 100,
  }

  $api.companies.getCompanies(params)
      .then((res) => {
        company_choices.value = res.data?.content?.map((item) => {
          return {
            title: item.compName,
            value: item.id,
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })

  $api.skills.getSkills(params)
      .then((res) => {
        skills_choices.value = res.data?.content?.map((item) => {
          return {
            title: item.skillName,
            value: item.id,
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
}

onMounted(() => {
  featCompanies()
})
</script>

<template>
  <div class="tw-flex tw-items-center tw-mt-[-40px]">
    <base-breadcrumb :breadcrumbs="breadcrumbs" :title="page.title"/>
    <v-spacer/>
    <v-dialog v-model="dialog" max-width="1000">
      <template #activator="{ props }">
        <v-btn v-bind="props" class="ml-auto" color="primary" flat :loading="loading">
          <v-icon class="mr-2">mdi-cart-plus</v-icon>
          Add Job
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="pa-4 bg-secondary">
          <span class="title text-white">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.jobName" hide-details label="Job Name" variant="outlined"/>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select v-model="editedItem.company" :items="company_choices" hide-details label="Company" variant="outlined"/>
              </v-col>
              <v-col cols="12">
                <v-select v-model="editedItem.skills" :items="skills_choices" multiple hide-details label="Skills" variant="outlined"/>
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="editedItem.jobDesc" hide-details label="Job Desc" variant="outlined"/>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer/>
          <v-btn color="error" @click="close">Cancel</v-btn>
          <v-btn
              color="secondary"
              variant="flat"
              @click="save"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <v-card elevation="10">
    <v-card-text>
      <v-data-table
          :custom-filter="filterOnlyCapsText"
          :headers="headers"
          :items="items"
          :search="search"
          item-value="name"
          :loading="isLoading"
          height="600"
          @update:itemsPerPage="updateItemsPerPage"
      >
        <template v-slot:top>
          <v-text-field
              v-model="search"
              label="Search (UPPER CASE ONLY)"
              class="pa-2"
          ></v-text-field>
        </template>

        <template v-slot:item.skills="{ item }">
          <div class="p-2" v-for="(skill,i) in item.selectable.skills" :key="i">
            <v-chip color="primary" text-color="white" small>{{ skill.skillName }}</v-chip>
          </div>
        </template>

        <template v-slot:item.jobDesc="{ item }">
          <div>
            {{ item.selectable.jobDesc.substring(0, 50) }}...
          </div>
        </template>

        <template v-slot:item.action="{ item }">
          <v-btn flat icon @click="editItem(item.raw)">
            <PencilIcon class="text-primary" size="20" stroke-width="1.5" />
          </v-btn>
          <v-btn flat icon @click="deleteItem(item.raw)">
            <TrashIcon class="text-error" size="20" stroke-width="1.5" />
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>