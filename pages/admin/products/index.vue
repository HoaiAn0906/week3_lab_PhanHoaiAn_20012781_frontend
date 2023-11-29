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
const files = ref([])
const readers = ref([])
const fileValue = ref(null)
const { $api } = useNuxtApp()
const loading = ref(false)
const toast = useToast()
const queryClient = useQueryClient()

const headers = [
  {
    title: 'Name',
    align: 'start',
    key: 'name',
  },
  {
    title: 'Image',
    align: 'center',
    key: 'productImages',
  },
  {
    title: 'Manufacturer name',
    align: 'start',
    key: 'manufacturer',
  },
  {
    title: 'Unit',
    align: 'start',
    key: 'unit',
  },
  {
    title: 'Description',
    align: 'start',
    key: 'description',
  },
  {
    title: 'Price',
    align: 'start',
    key: 'lastPrice',
  },
  {
    title: 'Status',
    align: 'start',
    key: 'status',
  },
  {
    title: 'Action',
    align: 'center',
    key: 'action',
  },
]

const editedItem = ref({
  id: null,
  name: '',
  manufacturer_name: '',
  unit: 'PIECE',
  description: '',
  status: 'ACTIVE',
  price: 0,
  image: null,
})

const defaultItem = ref({
  id: null,
  name: '',
  manufacturer_name: '',
  unit: '',
  description: '',
  status: '',
  price: 0,
  image: null,
})

const selectStatus = ['ACTIVE', 'INACTIVE']
const selectUnit = ['KG', 'LITER', 'PIECE']

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
  return editedIndex.value === -1 ? 'New Product' : 'Edit Product'
})

const save = () => {
  loading.value = true
  //form data
  let formData = new FormData()
  formData.append('name', editedItem.value.name)
  formData.append('manufacturer_name', editedItem.value.manufacturer_name)
  formData.append('unit', editedItem.value.unit)
  formData.append('description', editedItem.value.description)
  formData.append('price', editedItem.value.price)
  formData.append('status', editedItem.value.status)
  formData.append('image', files.value[0])
  $api.products.createProduct(formData)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        loading.value = false
        queryClient.invalidateQueries('products')
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

const addFiles = (e) => {
  files.value.forEach((file, f) => {
    readers.value[f] = new FileReader();
    readers.value[f].onloadend = (e) => {
      let fileData = readers.value[f].result
      let imgRef = fileValue.value[f]
      imgRef.src = fileData
    }

    readers.value[f].readAsDataURL(files.value[f]);
  })
}

const editItem = (item) => {
  editedIndex.value = items.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}

const deleteItem = (item) => {
  if (confirm('Are you sure you want to delete this item?') === false) {
    return false;
  } else {
    $api.products.deleteProduct(item.id)
        .then((res) => {
          toast.success(res.message)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          queryClient.invalidateQueries('products')
        })
  }
}
</script>

<template>
  <div class="tw-flex tw-items-center tw-mt-[-40px]">
    <base-breadcrumb :breadcrumbs="breadcrumbs" :title="page.title"/>
    <v-spacer/>
    <v-dialog v-model="dialog" max-width="1000">
      <template #activator="{ props }">
        <v-btn v-bind="props" class="ml-auto" color="primary" flat :loading="loading">
          <v-icon class="mr-2">mdi-cart-plus</v-icon>
          Add Contact
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
                <v-text-field v-model="editedItem.name" hide-details label="Name" variant="outlined"/>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.manufacturer_name" hide-details label="Manufacturer Name"
                              variant="outlined"/>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                    v-model="editedItem.unit"
                    hide-details
                    :items="selectUnit"
                    label="Unit"
                    variant="outlined"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.description" hide-details label="Description" variant="outlined"/>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.price" hide-details label="Price" variant="outlined" type="number"/>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                    v-model="editedItem.status"
                    hide-details
                    :items="selectStatus"
                    label="Status"
                    variant="outlined"
                />
              </v-col>
              <v-col cols="12">
                <v-file-input
                    accept="image/*"
                    label="Select files"
                    prepend-icon="mdi-camera"
                    multiple
                    chips
                    color="pink"
                    v-model="files"
                    @change="addFiles"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2" v-for="(file,f) in files" :key="f">
                {{ file.name }}
                <img :ref="'fileValue'" src="//placehold.it/400/99cc77" class="img-fluid tw-w-[100px] tw-h-[100px]" :title="'file' + f"/>
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

        <template v-slot:item.productImages="{ item }">
          <div class="p-2" v-for="(productImage,i) in item.selectable.productImages" :key="i">
            <v-img :src="productImage.path" :alt="productImage.path" height="100px"></v-img>
          </div>
        </template>

        <template v-slot:item.lastPrice="{ item }">
          <span class="tw-font-normal">
            {{ filters.currency(item.selectable.lastPrice) }}
          </span>
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip
              :color="item.status === 'ACTIVE' ? 'success' : 'error'"
              dark
          >
            {{ item.selectable.status }}
          </v-chip>
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