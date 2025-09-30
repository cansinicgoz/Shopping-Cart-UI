import { FaTimes } from "react-icons/fa"

const SizeGuideModal = ({ isOpen, onClose, category }) => {
  if (!isOpen) return null

  const getSizeGuide = (category) => {
    switch (category?.toLowerCase()) {
      case 'clothing':
      case 'fashion':
        return {
          title: "Clothing Size Guide",
          sizes: [
            { size: "XS", chest: "81-86 cm", waist: "66-71 cm", hip: "91-96 cm" },
            { size: "S", chest: "86-91 cm", waist: "71-76 cm", hip: "96-101 cm" },
            { size: "M", chest: "91-96 cm", waist: "76-81 cm", hip: "101-106 cm" },
            { size: "L", chest: "96-101 cm", waist: "81-86 cm", hip: "106-111 cm" },
            { size: "XL", chest: "101-106 cm", waist: "86-91 cm", hip: "111-116 cm" },
            { size: "XXL", chest: "106-111 cm", waist: "91-96 cm", hip: "116-121 cm" }
          ]
        }
      case 'shoes':
      case 'footwear':
        return {
          title: "Shoe Size Guide",
          sizes: [
            { size: "36", us: "5", uk: "3.5", cm: "23 cm" },
            { size: "37", us: "6", uk: "4", cm: "23.5 cm" },
            { size: "38", us: "7", uk: "5", cm: "24 cm" },
            { size: "39", us: "8", uk: "6", cm: "24.5 cm" },
            { size: "40", us: "9", uk: "7", cm: "25 cm" },
            { size: "41", us: "10", uk: "8", cm: "25.5 cm" },
            { size: "42", us: "11", uk: "9", cm: "26 cm" },
            { size: "43", us: "12", uk: "10", cm: "26.5 cm" },
            { size: "44", us: "13", uk: "11", cm: "27 cm" }
          ]
        }
      case 'electronics':
      case 'technology':
        return {
          title: "Electronics Product Sizes",
          sizes: [
            { size: "Small", description: "Headphones, mouse, small accessories" },
            { size: "Medium", description: "Phone, tablet, medium speakers" },
            { size: "Large", description: "Laptop, monitor, large speakers" },
            { size: "Extra Large", description: "TV, desktop computer, large equipment" }
          ]
        }
      default:
        return {
          title: "General Size Guide",
          sizes: [
            { size: "Small", description: "Compact and portable products" },
            { size: "Medium", description: "Standard size products" },
            { size: "Large", description: "Wide and voluminous products" }
          ]
        }
    }
  }

  const sizeGuide = getSizeGuide(category)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{sizeGuide.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300"
          >
            <FaTimes className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  {category?.toLowerCase() === 'clothing' || category?.toLowerCase() === 'fashion' ? (
                    <>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Size</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Chest</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Waist</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Hip</th>
                    </>
                  ) : category?.toLowerCase() === 'shoes' || category?.toLowerCase() === 'footwear' ? (
                    <>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">EU</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">US</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">UK</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">CM</th>
                    </>
                  ) : (
                    <>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Size</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Description</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {sizeGuide.sizes.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">{item.size}</td>
                    {category?.toLowerCase() === 'clothing' || category?.toLowerCase() === 'fashion' ? (
                      <>
                        <td className="border border-gray-300 px-4 py-3">{item.chest}</td>
                        <td className="border border-gray-300 px-4 py-3">{item.waist}</td>
                        <td className="border border-gray-300 px-4 py-3">{item.hip}</td>
                      </>
                    ) : category?.toLowerCase() === 'shoes' || category?.toLowerCase() === 'footwear' ? (
                      <>
                        <td className="border border-gray-300 px-4 py-3">{item.us}</td>
                        <td className="border border-gray-300 px-4 py-3">{item.uk}</td>
                        <td className="border border-gray-300 px-4 py-3">{item.cm}</td>
                      </>
                    ) : (
                      <td className="border border-gray-300 px-4 py-3">{item.description}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">💡 Tips:</h3>
            <ul className="text-blue-700 space-y-1">
              {category?.toLowerCase() === 'clothing' || category?.toLowerCase() === 'fashion' ? (
                <>
                  <li>• Measure the widest part when choosing size</li>
                  <li>• You can take one size larger for a comfortable fit</li>
                  <li>• Different brands may use different size standards</li>
                </>
              ) : category?.toLowerCase() === 'shoes' || category?.toLowerCase() === 'footwear' ? (
                <>
                  <li>• It's important for your toes to be comfortable when buying shoes</li>
                  <li>• Your feet may swell slightly at the end of the day</li>
                  <li>• Consider this if you're going to wear socks</li>
                </>
              ) : (
                <>
                  <li>• Choose product sizes according to your usage area</li>
                  <li>• Calculate the necessary space for transportation and installation</li>
                  <li>• Review product features in detail</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SizeGuideModal
