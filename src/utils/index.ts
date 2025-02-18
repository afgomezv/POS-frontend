export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export function isValidPage(value: number) {
  if (value == null) {
    return false;
  }

  if (typeof value !== "number" && isNaN(value)) {
    return false;
  }
  if (value <= 0) {
    return false;
  }

  if (!Number.isInteger(value)) {
    return false;
  }

  return true;
}

export function getImagePath(image: string) {
  const cloudinaryBaseUrl = "https://res.cloudinary.com";
  if (image.startsWith(cloudinaryBaseUrl)) {
    return image;
  } else {
    if (process.env.API_URL) {
      return `${process.env.IMAGE_URL}/img/${image}`;
    } else {
      return `${process.env.NEXT_PUBLIC_IMAGE_URL}/img/${image}`;
    }
  }
}

export const isAvailable = (stock: number) => stock > 0;
