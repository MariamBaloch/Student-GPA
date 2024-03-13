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
import { FilterMatchMode } from 'primevue/api'
import InputText from 'primevue/inputtext'

export default {
  name: 'Student',
  components: {
    TabView,
    TabPanel,
    DataTable,
    Column,
    Button,
    Dropdown,
    Tag,
    InputText
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
    grade: null,
    filters: {
      'course.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      'grade.letter': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      name: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    }
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
        await axios.post(`${BASE_URL}/enrolledCourses`, {
          student: this.$route.params.id,
          course: id
        })

        this.getStudentDetails()
      } catch (error) {}
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

      await axios.put(`${BASE_URL}/enrolledCourses/${newData._id}`, {
        score: this.grade.score,
        letter: this.grade.letter
      })
      this.getStudentDetails()
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
    },
    gradeStyle(data) {
      return [
        {
          'circle red': data.grade.letter === 'F',
          'circle orange':
            data.grade.letter === 'D' || data.grade.letter === 'C',
          'circle teal': data.grade.letter === 'B' || data.grade.letter === 'A'
        }
      ]
    }
  }
}
</script>

<template>
  <div class="container2">
    <div v-if="studentDetails" class="container1">
      <div class="left-div">
        <h1 Class="profile">Student</h1>
        <h3 Class="profile">{{ studentDetails.name }}</h3>
        <h3 Class="profile">{{ studentDetails.email }}</h3>
      </div>
      <div class="right-div">
        <h3 Class="profile-gpa" v-if="studentDetails.gpa">
          {{ studentDetails.gpa }} GPA
        </h3>
      </div>
    </div>
  </div>

  <div class="card">
    <TabView v-model:activeIndex="active">
      <TabPanel header="Enrolled Courses">
        <DataTable
          v-model:filters="filters"
          filterDisplay="row"
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
          <template #empty> No Courses found. </template>
          <template #paginatorstart>
            <Button type="button" icon="pi pi-refresh" text />
          </template>
          <template #paginatorend>
            <Button type="button" icon="pi pi-download" text />
          </template>
          <Column field="course.name" header="Course" style="width: 50%">
            <template #body="{ data }">
              {{ data.course.name }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                v-model="filterModel.value"
                type="text"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by course"
              />
            </template>
          </Column>
          <Column
            field="grade.letter"
            header="Grade"
            style="width: 50; text-align: center"
          >
            <template #header="{ header }">
              <div style="min-width: 15vw">
                {{ header }}
              </div>
            </template>
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
            <template #body="slotProps">
              <div :class="gradeStyle(slotProps.data)">
                {{
                  slotProps.data.grade.letter !== null
                    ? slotProps.data.grade.letter
                    : 'No Grade'
                }}
              </div>
            </template>

            <template #filter="{ filterModel, filterCallback }">
              <InputText
                v-model="filterModel.value"
                type="text"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by grade"
              />
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
          v-model:filters="filters"
          filterDisplay="row"
          v-if="allCourses"
          :value="allCourses"
          paginator
          :rows="10"
          :rowsPerPageOptions="[10, 25, 50, 75, 100]"
          tableStyle="min-width: 50rem"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
        >
          <template #empty> No Courses found. </template>
          <template #paginatorstart>
            <Button type="button" icon="pi pi-refresh" text />
          </template>
          <template #paginatorend>
            <Button type="button" icon="pi pi-download" text />
          </template>
          <Column field="name" header="Course" style="width: 50%">
            <template #body="{ data }">
              {{ data.name }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                v-model="filterModel.value"
                type="text"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by course"
              />
            </template>
          </Column>
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

<style>
.container1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-div {
  display: inline-block;
  padding-left: 9%;
  line-height: 0.3;
}

.right-div {
  display: inline-block;
  padding-right: 9%;
  font-size: 300%;
}

.profile {
  color: #4a4179;
  text-align: left;
  /* padding-bottom: 0.005%; */
}

.profile-picture {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-gpa {
  color: #4a4179;
  text-align: right;
}

.container2 {
  display: inline-block;
  background-color: rgb(255, 255, 255);
  width: 90%;
  height: 100%;
  margin-bottom: 2%;
}
</style>
