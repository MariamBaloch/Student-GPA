<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { BASE_URL } from '../globals'
import Button from 'primevue/button'
import axios from 'axios'

export default {
  name: 'HomePage',
  data: function () {
    return {
      students: null,
      selectedStudent: null
    }
  },
  components: {
    DataTable,
    Column,
    Button
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
      // this.$toast.add({
      //   severity: 'info',
      //   summary: 'Product Selected',
      //   detail: 'Name: ' + event.data.name,
      //   life: 3000
      // })
      console.log()
      this.$router.push(`/enrolledCourses/${e.data._id}`)
    }
  }
}
</script>

<template>
  <div class="card">
    <DataTable
      v-model:selection="selectedStudent"
      selectionMode="single"
      dataKey="_id"
      :metaKeySelection="false"
      :value="students"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      @rowSelect="onRowSelect"
    >
      <template #paginatorstart>
        <Button type="button" icon="pi pi-refresh" text />
      </template>
      <template #paginatorend>
        <Button type="button" icon="pi pi-download" text />
      </template>
      <Column field="name" header="Name" style="width: 50%"></Column>
      <Column field="email" header="Email" style="width: 50%"></Column>
      <Column field="gpa" header="Overall GPA" style="width: 25%"></Column>
    </DataTable>
  </div>
</template>