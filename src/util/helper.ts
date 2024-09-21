import {sha512} from "js-sha512";
import {writeFile, utils} from "xlsx";
import {message, Modal} from "ant-design-vue";
import dayjs from "dayjs";
import {createVNode, UnwrapRef} from "vue";
import {ExclamationCircleOutlined} from "@ant-design/icons-vue";

let loading: any;
let connecting: any;

export const hashPassword = (text: UnwrapRef<string | null>): string => {
  const hash = sha512.create();
  if (text !== null && typeof text === 'string') {
    hash.update(text);
  } else {
    throw new Error("Invalid input: Password cannot be null");
  }
  return hash.hex();
}


export const showLoading = () => {
  if (loading) hideLoading()
  loading = message.loading('ກຳລັງດໍາເນີນການ...', 0);
};

export const showConnecting = () => {
  connecting = message.loading('ກໍາລັງເຊື່ອມຕໍ່...', 0);
};

export const hideLoading = () => {
  setTimeout(loading, 0)
};

export const hideConnecting = () => {
  setTimeout(connecting, 0)
};

export const getAvatar = () => {
  return 'https://joeschmoe.io/api/v1/random'
}
export const getFallbackImage = () => {
  return 'data:image/png;base64,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'
}

export const capitalize = (text: string): string => {
  return text.replace(/\b\w/g, l => l.toUpperCase())
}

export const statusTagColor = (status?: string): string => {
  if (status?.toUpperCase() === "ACTIVE") return "green";
  if (status?.toUpperCase() === "APPROVED") return "green";
  if (status?.toUpperCase() === "PAID") return "green";
  if (status?.toUpperCase() === "YES") return "green";
  if (status?.toUpperCase() === "PENDING") return "yellow";
  if (status?.toUpperCase() === "WAITING") return "yellow";
  if (status?.toUpperCase() === "NO") return "red";
  if (status?.toUpperCase() === "REJECTED") return "red";
  if (status?.toUpperCase() === "CANCELLED") return "red";
  if (status?.toUpperCase() === "DELETED") return "red";
  if (status?.toUpperCase() === "PROCESSING") return "blue";
  if (status?.toUpperCase() === "COMPLETED") return "green";
  return "grey"
}

export const typeTagColor = (status?: string): string => {
  if (status?.toUpperCase() === "USER") return "blue";
  if (status?.toUpperCase() === "STAFF") return "yellow";
  if (status?.toUpperCase() === "WAITING") return "yellow";
  if (status?.toUpperCase() === "CASHIER") return "green";
  if (status?.toUpperCase() === "SELLER") return "green"
  if (status?.toUpperCase() === "CLAIMER") return "purple"
  if (status?.toUpperCase() === "ADMIN") return "red";
  if (status?.toUpperCase() === "MALE") return "blue";
  if (status?.toUpperCase() === "FEMALE") return "pink";
  if (status?.toUpperCase() === "GOV") return "red"
  if (status?.toUpperCase() === "PRIVATE") return "blue"
  return "grey"
}

export const getBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export const setDateInput = (val?: string) => {
  return dayjs(val).format('DD/MM/YYYY')
}

export const formatDateInput = (val?: string) => {
  return dayjs(val?.split('/').reverse().join('-')).format('YYYY-MM-DD')
}

export const formatDate = (val?: string) => {
  return dayjs(val).format('YYYY-MM-DD')
}

export const formatDatetime = (val?: string) => {
  if (!val) return '00/00/0000 00:00:00'
  return dayjs(val).format('DD/MM/YYYY HH:mm:ss')
}

export const baseUrl = (): string => {
  return import.meta.env.VITE_API_URL
}

export const uploadUrl = (): string => {
  return baseUrl() + '/upload'
}

export const imageUrl = (path?: string): string => {
  return `${import.meta.env.VITE_IMAGE_URL}${path || ''}`
}

export const socketUrl = (): string => {
  return import.meta.env.VITE_SOCKET_URL
}

export const parseImageUrl = (img: any): string => {
  return img && !img.startsWith('http') ? `${imageUrl()}/${img}` : img
}

export const exportXLSX = (fileName: string, data: any) => {
  const sheet = utils.json_to_sheet(data)
  const book = utils.book_new()
  utils.book_append_sheet(book, sheet)
  writeFile(book, fileName, {
    bookType: 'xlsx', type: 'binary'
  })
}

export const generateString = (length = 12): string => {
  let result = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const timelineColor = (status?: string): string => {
  if (status?.toUpperCase() === "PENDING") return "orange";
  if (status?.toUpperCase() === "ASSIGNED") return "blue";
  if (status?.toUpperCase() === "PROCESSING") return "blue";
  if (status?.toUpperCase() === "APPROVED") return "green";
  if (status?.toUpperCase() === "RETURNED") return "black";
  if (status?.toUpperCase() === "CANCELLED") return "red";
  return "grey"
}

export const readingTime = (started: string, ended: string) => {
  return formatMillisecondsToTime(dayjs(new Date(ended)).diff(dayjs(new Date(started))))
}
export const formatNumber = (num: number, locale: string, options?: Intl.NumberFormatOptions): string => {
  return new Intl.NumberFormat(locale, options).format(num);
};
export const confirmModal = (title: string = 'ທ່ານຕ້ອງການດໍາເນີນການແທ້ ຫລື ບໍ່?') => {
  return new Promise((resolve) => {
    Modal.confirm({
      title,
      icon: createVNode(ExclamationCircleOutlined),
      content: createVNode('div', {style: 'color:red;'}, "ກົດປຸ່ມ 'OK' ເພື່ອຢືນຢັນ"),
      //okButtonProps: { style: { background: 'black', color: 'white' } }, // Add this line
      onOk() {
        resolve(true)
      }
    });
  })
}
export const formatMoneyRate = (amount: number, ccy?: string) => {
  if (!amount) amount = 0;
  if (typeof amount === 'string') {
    amount = parseFloat(amount)
  }
  const amt = amount.toLocaleString('de-DE', {
    style: 'currency',
    currency: 'LAK',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2
  });
  let symbol = ''
  return `${symbol} ${amt.split('LAK')[0].trim()}`;
}
export const formatMoney = (amount: number, ccy?: string) => {
  if (!amount) amount = 0;
  if (typeof amount === 'string') {
    amount = parseFloat(amount)
  }
  const amt = amount.toLocaleString('de-DE', {
    style: 'currency',
    currency: 'LAK',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2
  });
  let symbol = '₭'
  return `${symbol} ${amt.split('LAK')[0].trim()}`;
}

function formatMillisecondsToTime(milliseconds: number) {
  const seconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  return formattedTime;
}



