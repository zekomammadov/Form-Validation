export default [
    { type: 'text', name: 'name', label: 'Name', errors: {
        required:'Zəhmət olmasa adı boş buraxmayın',
        min: 3,
        
    } },
    { type: 'text', name: 'surname', label: 'Surname' },
    { type: 'text', name: 'phone', label: 'Phone' },
    { type: 'text', name: 'email', label: 'Email' },
    {
        type: 'select', name: 'age', label: 'Age', options: [
            {value:'0-18', name:'0 - 18'},
            {value:'18-25', name:'18 - 25'},
            {value:'25 - 40', name:'25 - 40'},
            {value:'40 +', name:'40 +'},
        ]
    },
    {
        type: 'select', name: 'hobbi', label: 'Hobby', options: [
            { value: 'football', name: 'Football' },
            { value: 'basketball', name: 'Basketball' },
            { value: 'tennis', name: 'Tennis' }
        ]
    },
    { type: 'text', name: 'password', label: 'Password' },
    { type: 'text', name: 'rpassword', label: 'Repeat Password' },

]

