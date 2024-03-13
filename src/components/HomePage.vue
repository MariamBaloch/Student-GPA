<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { BASE_URL } from '../globals'
import axios from 'axios'
import { FilterMatchMode } from 'primevue/api'
import InputText from 'primevue/inputtext'

export default {
  name: 'HomePage',
  data: function () {
    return {
      students: null,
      selectedStudent: null,
      filters: {
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        gpa: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
      }
    }
  },
  components: {
    DataTable,
    Column,
    Button,
    InputText
  },
  mounted() {
    this.getStudents()
  },
  methods: {
    async getStudents() {
      let res = await axios.get(`${BASE_URL}/students`)
      this.students = res.data
    },
    onRowSelect(e) {
      this.$router.push(`/enrolledCourses/${e.data._id}`)
    },
    overallGPA(data) {
      return [
        {
          'circle red': data.gpa === 0,
          'circle orange': data.gpa > 0 && data.gpa < 3,
          'circle teal': data.gpa >= 3 && data.gpa <= 4
        }
      ]
    }
  }
}
</script>

<template>
  <div class="card">
    <DataTable
      v-model:filters="filters"
      filterDisplay="row"
      v-model:selection="selectedStudent"
      selectionMode="single"
      dataKey="_id"
      :metaKeySelection="false"
      :value="students"
      paginator
      :rows="10"
      :rowsPerPageOptions="[10, 25, 50, 75, 100]"
      tableStyle="min-width: 50rem"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      @rowSelect="onRowSelect"
    >
      <template #empty> No students found. </template>
      <template #paginatorstart>
        <Button type="button" icon="pi pi-refresh" text />
      </template>
      <template #paginatorend>
        <Button type="button" icon="pi pi-download" text />
      </template>
      <Column field="name" header="Name" style="width: 40%">
        <template #body="{ data }">
          {{ data.name }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="Search by name"
          />
        </template>
      </Column>
      <Column field="email" header="Email" style="width: 25%">
        <template #body="{ data }">
          {{ data.email }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="Search by email"
          /> </template
      ></Column>
      <Column field="gpa" header="CGPA" style="width: 25%; text-align: center">
        <template #header="{ header }">
          <div style="min-width: 10vw">
            {{ header }}
          </div>
        </template>
        <template #body="slotProps">
          <div :class="overallGPA(slotProps.data)">
            {{ slotProps.data.gpa !== null ? slotProps.data.gpa : 'No CGPA' }}
          </div>
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="Search by CGPA"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style>
.card {
  padding-left: 5%;
  padding-right: 5%;
}
</style>
