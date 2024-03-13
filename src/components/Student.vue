<script>
import { BASE_URL } from '../globals'
import axios from 'axios'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import Tag from 'primevue/tag'

export default {
  name: 'Student',
  components: {
    TabView,
    TabPanel,
    DataTable,
    Column,
    Button,
    Dropdown,
    Tag
  },
  data: () => ({
    active: 0,
    studentDetails: null,
    enrolled: null,
    allCourses: null,
    editingRows: [],
    grades: [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
      { label: 'D', value: 'D' },
      { label: 'F', value: 'F' }
    ],
    grade: null
  }),
  mounted() {
    this.getStudentDetails()
  },
  methods: {
    async getStudentDetails() {
      let studentRes = await axios.get(
        `${BASE_URL}/students/${this.$route.params.id}`
      )
      this.studentDetails = studentRes.data

      let res = await axios.get(
        `${BASE_URL}/enrolledCourses/${this.$route.params.id}`
      )
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
        this.getStudentDetails()
      } catch (error) {
        console.log(error)
      }
    },
    async onRowEditSave(event) {
      let { newData, index } = event
      this.enrolled[index] = newData

      switch (newData['grade.letter']) {
        case 'A':
          this.grade = { score: 4, letter: 'A' }
          break
        case 'B':
          this.grade = { score: 3, letter: 'B' }
          break
        case 'C':
          this.grade = { score: 2, letter: 'C' }
          break
        case 'D':
          this.grade = { score: 1, letter: 'D' }
          break
        case 'F':
          this.grade = { score: 0, letter: 'F' }
          break
        default:
          return null
      }
      console.log('grade', this.grade)
      let res = await axios.put(`${BASE_URL}/enrolledCourses/${newData._id}`, {
        score: this.grade.score,
        letter: this.grade.letter
      })
      console.log(res)
    },
    getStatusLabel(grades) {
      switch (grades) {
        case 'A':
          return 'success'
        case 'B':
          return 'success'
        case 'C':
          return 'warning'
        case 'D':
          return 'warning'
        case 'F':
          return 'danger'
        default:
          return null
      }
    }
  }
}
</script>

<template>
  <div v-if="studentDetails">
    <h1>Student</h1>
    <h3>{{ studentDetails.name }}</h3>
    <h4>{{ studentDetails.email }}</h4>
    <h4>{{ studentDetails.gpa }}</h4>
  </div>
  <div class="card">
    <TabView v-model:activeIndex="active">
      <TabPanel header="Enrolled Courses">
        <DataTable
          v-model:editingRows="editingRows"
          editMode="row"
          dataKey="_id"
          @row-edit-save="onRowEditSave"
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
          <Column field="grade.letter" header="Grade" style="width: 50%">
            <template #editor="{ data, field }">
              <Dropdown
                v-model="data[field]"
                :options="grades"
                optionLabel="label"
                optionValue="value"
                placeholder="Select a Status"
              >
                <template #option="slotProps">
                  <Tag
                    :value="slotProps.option.value"
                    :severity="getStatusLabel(slotProps.option.value)"
                  />
                </template>
              </Dropdown>
            </template>
          </Column>
          <Column
            :rowEditor="true"
            style="width: 10%; min-width: 8rem"
            bodyStyle="text-align:center"
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
          <Column header="Enroll" style="width: 40%">
            <template #body="{ data }">
              <Button type="button" label="Enroll" @click="enroll(data._id)" />
            </template>
          </Column>
        </DataTable>
      </TabPanel>
    </TabView>
  </div>
</template>
