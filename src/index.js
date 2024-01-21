const { createApp } = Vue



const App = createApp({

  data() {

    return {
      texttosummary: '',
      summaryedtext: '',
      file: null,
      historydata:[]

    }

  },

  methods: {

    summarytext() {

      if (this.texttosummary != '') {

        request('/summarytext', 'POST', { text: this.texttosummary}).then(data => {


          this.summaryedtext = data
         

        })
      }
      else {

        alert('please add text to summary')

      }
    },

    uploadFile() {

      this.file = this.$refs.file.files[0];

    },

    submitFile() {

      if (this.file) {

        const formData = new FormData();
        formData.append('file', this.file);
      
        const headers = { 'Content-Type': 'multipart/form-data' };

        axios.post('http://127.0.0.1:5000/summaryfile', formData, { responseType: 'blob', }, { headers }).then((res) => {


          var FILE = window.URL.createObjectURL(new Blob([res.data]));

          var docUrl = document.createElement('a');
          docUrl.href = FILE;
          docUrl.setAttribute('download', 'file.pdf');
          document.body.appendChild(docUrl);
          docUrl.click();


        });

      }
    },
    history(){

      request('/history', 'POST', { text: 'ok'}).then(data => {

        this.historydata==[]
       
        this.historydata.push(Object(data))

        
        
        
      


      })
    }
  }

})

App.mount('#vueapp')


async function request(url, method, data) {

  try {


    const headers = {}
    let body
    if (data) {

      headers['Content-Type'] = 'application/json'

      body = JSON.stringify(data)

    }
    const response = await fetch('http://127.0.0.1:5000' + url, {
      method,
      headers,
      body
    })

    return await response.json()

  }
  catch (e) {

    console.warn('Error:', e.message)

  }
}
