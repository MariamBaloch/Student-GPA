<script>
import { BASE_URL } from '../globals'
import axios from 'axios'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'

export default {
  name: 'Student',
  components: {
    TabView,
    TabPanel,
    DataTable,
    Column,
    Button
  },
  data: () => ({
    active: 0,
    studentDetails: null,
    enrolled: null,
    allCourses: null
  }),
  mounted() {
    this.getStudentDetails()
  },
  methods: {
    async getStudentDetails() {
      let res = await axios.get(
        `${BASE_URL}/enrolledCourses/${this.$route.params.id}`
      )
      this.studentDetails = res.data
      this.allCourses = res.data.courses
      this.enrolled = res.data.enrolledCourses
    },
    async enroll(id) {
      try {
        let res = await axios.post(`${BASE_URL}/enrolledCourses`, {
          student: this.$route.params.id,
          course: id
        })
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<template>
  <div class="card">
    <TabView v-model:activeIndex="active">
      <TabPanel header="Enrolled Courses">
        <DataTable
          v-if="enrolled"
          :value="enrolled"
          paginator
          :rows="10"
          :rowsPerPageOptions="[10, 25, 50, 75, 100]"
          tableStyle="min-width: 50rem"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
        >
          <template #paginatorstart>
            <Button type="button" icon="pi pi-refresh" text />
          </template>
          <template #paginatorend>
            <Button type="button" icon="pi pi-download" text />
          </template>
          <Column
            field="course.name"
            header="Course"
            style="width: 50%"
          ></Column>
          <Column
            field="grade.letter"
            header="Grade"
            style="width: 50%"
          ></Column>
        </DataTable>
      </TabPanel>
      <TabPanel header=" All Courses">
        <DataTable
          v-if="allCourses"
          :value="allCourses"
          paginator
          :rows="10"
          :rowsPerPageOptions="[10, 25, 50, 75, 100]"
          tableStyle="min-width: 50rem"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
        >
          <template #paginatorstart>
            <Button type="button" icon="pi pi-refresh" text />
          </template>
          <template #paginatorend>
            <Button type="button" icon="pi pi-download" text />
          </template>
          <Column field="name" header="Course" style="width: 50%"></Column>
          <Column header="Enroll" style="width: 50%">
            <template #body="{ data }">
              <Button type="button" label="Enroll" @click="enroll(data._id)" />
            </template>
          </Column>
        </DataTable>
      </TabPanel>
    </TabView>
  </div>
</template>
