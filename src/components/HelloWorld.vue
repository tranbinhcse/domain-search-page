<template>
  <div>
    <Summary />
    <Box>
      <Table>
        <thead>
          <tr>
            <th>Song</th>
            <th>Artist</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          <table-row>
            <table-col>fsdafas</table-col>
            <table-col>
              <badge
                :variant="'inactive'"
                :labels="{ inactive: 'Huy', processing: 'dang xu ly' }"
              />
              <badge
                :variant="'processing'"
                :labels="{ inactive: 'Huy', processing: 'dang xu ly' }"
              />
            </table-col>
            <table-col>fsdafas</table-col>
          </table-row>
          <table-row>
            <table-col>fsdafas</table-col>
            <table-col>fsdafas</table-col>
            <table-col>fsdafas</table-col>
          </table-row>
          <table-row>
            <table-col>fsdafas</table-col>
            <table-col>fsdafas</table-col>
            <table-col>fsdafas</table-col>
          </table-row>
          <table-row>
            <table-col>fsdafas</table-col>
            <table-col>fsdafas</table-col>
            <table-col>fsdafas</table-col>
          </table-row>
        </tbody>
      </Table>
    </Box>
    <box>
      <Input placeholder="Nhap username" />
    </box>
  </div>
</template>

<script>
import Box from './base/Box.vue'
import Summary from './dashboard/Summary.vue'
import Table from './base/table/Table.vue'
import TableRow from './base/table/TableRow.vue'
import TableCol from './base/table/TableCol.vue'
import Badge from './base/Badge.vue'
import Input from './base/Input.vue'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: { Box, Summary, Table, TableRow, TableCol, Badge, Input }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
