export const mimeTypeSupport = (type: string): boolean => {
  const mimeTypes: boolean = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'application/pdf'].includes(type)
  return mimeTypes
}
