<template>
  <v-container fluid grid-list-xs class="form-cont-detail">
    <v-layout row wrap class="pad-bot-80px">
        <v-flex xs12 lg12>
            <v-layout row>
                <v-flex xs3 lg2 class="center-middle">
                    <v-subheader>Front Image</v-subheader>
                </v-flex>
                <v-flex xs9 lg10>
                    <v-layout row>
                        <v-flex xs9 lg11>
                        <v-text-field
                            v-model="xs"
                            disabled
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs3 lg1 class="center-middle">
                        <fileupload class="btn-primary-cst"
                            extensions="gif,jpg,jpeg,png,webp"
                            v-model="fin"
                            accept="image/png,image/gif,image/jpeg,image/webp"
                            :multiple="false"
                            :size="1024 * 1024 * 10"
                            @input="updatetValue"
                            ref="upload">
                                <i class="fa fa-upload"></i>
                        </fileupload>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12>
            <v-layout row>
                <v-flex xs3 lg2 class="center-middle">
                    <v-subheader>Gallery Image</v-subheader>
                </v-flex>
                <v-flex xs3 lg1 class="center-middle">
                    <fileupload class="btn-primary-cst"
                        extensions="gif,jpg,jpeg,png,webp"
                        v-model="files"
                        accept="image/png,image/gif,image/jpeg,image/webp"
                        :multiple="true"
                        @input-filter="inputFilter"
                        @input-file="inputFile"
                        :size="1024 * 1024 * 10"
                        ref="upload">
                            <i class="fa fa-upload"></i>
                    </fileupload>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs3 lg2 class="center-middle">
                </v-flex>
                <v-flex xs9 lg10 class="center-middle">
                    <v-container fluid grid-list-xl>
                        <v-layout row wrap>
                            <v-flex xs6 lg2 v-for="(file,index) in files" :key="file.id" @click="tess(index)">
                                <img :src="file.thumb" width="100%" height="100%" type='image/png'>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import fileupload from 'vue-upload-component'
import ImageCompressor from 'image-compressor'
export default {
  data: () => ({
    fin: [],
    xs: '',
    selected: [],
    files: []
  }),
  methods: {
    updatetValue (value) {
      this.xs = value[0].name
    },
    tess (value) {
      this.files.splice(value, 1)
    },
    inputFilter (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Before adding a file
        // 添加文件前
        // Filter system files or hide files
        // 过滤系统文件 和隐藏文件
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent()
        }
        // Filter php html js file
        // 过滤 php html js 文件
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent()
        }
      }
      // Automatic compression
      // 自动压缩
      if (newFile.file && newFile.type.substr(0, 6) === 'image/' && this.autoCompress > 0 && this.autoCompress < newFile.size) {
        newFile.error = 'compressing'
        const imageCompressor = new ImageCompressor(null, {
          convertSize: Infinity,
          maxWidth: 512,
          maxHeight: 512
        })
        imageCompressor.compress(newFile.file)
          .then((file) => {
            this.$refs.upload.update(newFile, { error: '', file, size: file.size, type: file.type })
          })
          .catch((err) => {
            this.$refs.upload.update(newFile, { error: err.message || 'compress' })
          })
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        // Create a blob field
        // 创建 blob 字段
        newFile.blob = ''
        let URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.blob = URL.createObjectURL(newFile.file)
        }
        // Thumbnails
        // 缩略图
        newFile.thumb = ''
        if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
          newFile.thumb = newFile.blob
        }
      }
    },
    // add, update, remove File Event
    inputFile (newFile, oldFile) {
      if (newFile && oldFile) {
        // update
        if (newFile.active && !oldFile.active) {
          // beforeSend
          // min size
          if (newFile.size >= 0 && this.minSize > 0 && newFile.size < this.minSize) {
            this.$refs.upload.update(newFile, { error: 'size' })
          }
        }
        if (newFile.progress !== oldFile.progress) {
          // progress
        }
        if (newFile.error && !oldFile.error) {
          // error
        }
        if (newFile.success && !oldFile.success) {
          // success
        }
      }
      if (!newFile && oldFile) {
        // remove
        if (oldFile.success && oldFile.response.id) {
          // $.ajax({
          //   type: 'DELETE',
          //   url: '/upload/delete?id=' + oldFile.response.id,
          // })
        }
      }
      // Automatically activate upload
      if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
        if (this.uploadAuto && !this.$refs.upload.active) {
          this.$refs.upload.active = true
        }
      }
    }
  },
  components: {
    fileupload
  }
}
</script>