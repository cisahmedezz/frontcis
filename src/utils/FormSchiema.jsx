export const formSchiema = [
  {
    placeholder: "Name",
    name: "name",
    type: "text",
    required: true,
  },
  {
    placeholder: "Age",
    name: "age",
    type: "select",
    required: true,
    options: [
      {
        age: "18 - 22",
        id: "1",
      },
      {
        age: "23 - 30",
        id: "2",
      },
      {
        age: "30 - 40",
        id: "3",
      },
    ],
  },
  {
    placeholder: "Profile Picture",
    name: "picture",
    type: "image",
    required: true,
  },
  {
    placeholder: "Gallery",
    name: "gallery",
    type: "multiple-files",
    required: true,
  },
];

export const formErrors = {
  //   name: "Name Field is Required",
  //   age: "Age Field is Required",
  //   profile: "Profile Field is Required",
  //   gallery: "Gallery Field is Required",
};

export const firstForm = {
  formTitle_en: "New Document",
  formTitle_ar: "وثيقة جديدة",
  questions: [
    // {
    //   title_en: "Document Type",
    //   title_ar: "نوع الوثيقة",
    //   type: "select",
    //   name: "document_type",
    //   required: true,
    //   options: [
    //     {
    //       title_en: "Private Accidents",
    //       title_ar: "حوادث شخصية",
    //       id: 1,
    //     },
    //     {
    //       title_en: "Loan Insurance",
    //       title_ar: "تأمين قروض",
    //       id: 2,
    //     },
    //   ],
    // },
    {
      title_en: "User Name",
      title_ar: "اسم المستفيد",
      type: "text",
      required: true,
      name: "user_name",
    },
    {
      title_en: "National ID",
      title_ar: "الرقم القومي",
      type: "number",
      required: true,
      name: "national_id",
    },
    {
      title_en: "Birthdate",
      title_ar: "تاريخ الميلاد",
      type: "date",
      required: true,
      name: "birthdate",
    },
    {
      title_en: "User Address",
      title_ar: "عنوان المستفيد",
      type: "text",
      required: true,
    },
    {
      title_en: "Email",
      title_ar: "البريد الإلكتروني",
      type: "email",
      required: true,
      name: "email",
    },
    {
      title_en: "Job",
      title_ar: "المهنة",
      type: "text",
      required: true,
      name: "job",
    },
    {
      title_en: "Activity Type",
      title_ar: "نوع النشاط",
      type: "text",
      required: true,
      name: "activity_type",
    },
    {
      title_en: "Activity Title",
      title_ar: "عنوان النشاط",
      type: "text",
      required: true,
      name: "activity_name",
    },
    {
      title_en: "Currency",
      title_ar: "العملة",
      type: "text",
      required: true,
      name: "currency",
    },
    {
      title_en: "From",
      title_ar: "من",
      type: "date",
      required: true,
      name: "from",
    },
    {
      title_en: "To",
      title_ar: "إلى",
      type: "date",
      required: true,
      name: "to",
    },
    {
      title_en: "Insurance Cost",
      title_ar: "مبلغ التأمين",
      type: "number",
      required: true,
      name: "to",
    },

    {
      title_en: "Cover Percentage",
      title_ar: "نسبة التغطية",
      type: "number",
      required: true,
      name: "cover_percentage",
    },
    {
      title_en: "Discount Percentage",
      title_ar: "نسبة الخصم",
      type: "number",
      required: true,
      name: "discount_percentage",
    },
    {
      title_en: "Net Installment",
      title_ar: "صافي القسط",
      type: "number",
      required: true,
      name: "net_installment",
    },
    {
      title_en: "Paid Stamp ",
      title_ar: "الدمعه المدفوعة",
      type: "number",
      required: true,
      name: "paid_stamp",
    },
    {
      title_en: "Relative Stamp ",
      title_ar: "الدمعه النسبية",
      type: "number",
      required: true,
      name: "relative_stamp",
    },
    {
      title_en: "Supervision and Control Expenses",
      title_ar: "مصاريف الإشراف والرقابة",
      type: "number",
      required: true,
      name: "relative_stamp",
    },
    {
      title_en: "Issuance Expenses",
      title_ar: "مصاريف الإصدار",
      type: "number",
      required: true,
      name: "relative_stamp",
    },
    {
      title_en: "Total Installment",
      title_ar: "اجمالي القسط",
      type: "number",
      required: true,
      name: "relative_stamp",
    },
    {
      title_en: "Good insurance",
      title_ar: "التأمين لصالح",
      type: "text",
      required: true,
      name: "relative_stamp",
    },
    {
      title_en: "Mediator",
      title_ar: "الوسيط",
      type: "text",
      required: true,
      name: "relative_stamp",
    },
    {
      title_en: "Guarantor",
      title_ar: "الضامن",
      type: "text",
      required: true,
      name: "relative_stamp",
    },
    {
      title_en: "Guarantor National ID",
      title_ar: "الرقم القومي الضامن",
      type: "number",
      required: true,
      name: "relative_stamp",
    },
    {
      title_en: "Guarantor Address",
      title_ar: "عنوان الضامن",
      type: "text",
      required: true,
      name: "relative_stamp",
    },
    {
      title_en: "Guarantor Address",
      title_ar: "رقم هاتف الضامن",
      type: "number",
      required: true,
      name: "relative_stamp",
    },
    {
      title_en: "Guarantor Birthdate",
      title_ar: "تاريخ ميلاد الضامن",
      type: "date",
      required: true,
      name: "relative_stamp",
    },
  ],
};

export const additionalInfo = {
  formTitle_en: "New Document",
  formTitle_ar: "وثيقة جديدة",
  questions: [
    {
      title_en: "	Have you preceded the insurance of another company?",
      title_ar: "	هل سبق التأمين لدى شركة أخرى",
      type: "select",
      name: "document_type",
      required: true,
      options: [
        {
          title_en: "Yes",
          title_ar: "نعم",
          id: 1,
        },
        {
          title_en: "لا",
          title_ar: "No",
          id: 2,
        },
      ],
    },
    {
      title_en: "	Do you have insurance at the present time?",
      title_ar: "	هل مؤمن عليك في الوقت الحالي؟",
      type: "select",
      name: "document_type",
      required: true,
      options: [
        {
          title_en: "Yes",
          title_ar: "نعم",
          id: 1,
        },
        {
          title_en: "لا",
          title_ar: "No",
          id: 2,
        },
      ],
    },
    {
      title_en: "	Have you been rejected from any insurance company?",
      title_ar: "	هل تم رفضك من اي شركة تأمين؟",
      type: "select",
      name: "document_type",
      required: true,
      options: [
        {
          title_en: "Yes",
          title_ar: "نعم",
          id: 1,
        },
        {
          title_en: "لا",
          title_ar: "No",
          id: 2,
        },
      ],
    },
    {
      title_en: "The company's name is in the event of rejection",
      title_ar: "أسم الشركة في حالة الرفض",
      type: "text",
      name: "document_type",
      required: true,
    },
    {
      title_en:
        "The insurance amount is in the case you have insurance at the present time",
      title_ar: "مبلغ التأمين في حالة مؤمن عليك في الوقت الحالي",
      type: "number",
      required: true,
      name: "user_name",
    },
  ],
};

export const additionalDangers = {
  formTitle_en: "New Document",
  formTitle_ar: "وثيقة جديدة",
  questions: [
    {
      title_en: "The body was transferred in the event of death in an accident",
      title_ar: "نقل الجثمان في حالة الوفاة بحادث",
      type: "select",
      name: "document_type",
      required: true,
      options: [
        {
          title_en: "Yes",
          title_ar: "نعم",
          id: 1,
        },
        {
          title_en: "لا",
          title_ar: "No",
          id: 2,
        },
      ],
    },
    {},
    {
      title_en: "The amount of risk insurance",
      title_ar: "مبلغ تأمين الخطر",
      type: "number",
      required: true,
      name: "user_name",
    },
    {
      title_en: "Risk installments",
      title_ar: "قسط الخطر",
      type: "number",
      required: true,
      name: "user_name",
    },
    {
      title_en:
        "Covering the funeral expenses in the event of death in an accident",
      title_ar: "تغطية مصاريف الجنازة في حالة الوفاة بحادث",
      type: "select",
      name: "document_type",
      required: true,
      options: [
        {
          title_en: "Yes",
          title_ar: "نعم",
          id: 1,
        },
        {
          title_en: "لا",
          title_ar: "No",
          id: 2,
        },
      ],
    },
    {},
    {
      title_en: "The amount of risk insurance",
      title_ar: "مبلغ تأمين الخطر",
      type: "number",
      required: true,
      name: "user_name",
    },
    {
      title_en: "Risk installments",
      title_ar: "قسط الخطر",
      type: "number",
      required: true,
      name: "user_name",
    },
    {
      title_en:
        "Covering the school expenses in the event of death in an accident",
      title_ar: "تغطية مصاريف المدارس في حالة الوفاة بحادث",
      type: "select",
      name: "document_type",
      required: true,
      options: [
        {
          title_en: "Yes",
          title_ar: "نعم",
          id: 1,
        },
        {
          title_en: "لا",
          title_ar: "No",
          id: 2,
        },
      ],
    },
    {},
    {
      title_en: "The amount of risk insurance",
      title_ar: "مبلغ تأمين الخطر",
      type: "number",
      required: true,
      name: "user_name",
    },
    {
      title_en: "Risk installments",
      title_ar: "قسط الخطر",
      type: "number",
      required: true,
      name: "user_name",
    },
  ],
};
