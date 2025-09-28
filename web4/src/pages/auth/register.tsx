// import { useMutation, useQuery } from '@apollo/client';
// import { useRouter } from 'next/router';
// import { useForm, useFormState } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { FiArrowLeft, FiChevronDown } from 'react-icons/fi';
// import Link from 'next/link';
// import PublicLayout from '../../components/Layout/PublicLayout';
// import { setAuthToken } from '../../lib/auth';
// import { gql } from '@apollo/client';
// import { useEffect, useState, useMemo, useRef } from 'react';
// import { CitiesQueryResponse, CitiesResponse, MartiniqueCity } from '../../types';


// interface MartiniqueCity {
//   id: string;
//   name: string;
//   postalCode: string;
//   agglomeration: string;
//   population: number;
// }

// interface DiasporaLocation {
//   id: string;
//   country: string;
//   countryCode: string;
//   region?: string;
// }

// interface DiasporaLocationResponse {
//   diasporaLocations: DiasporaLocation[];
// }


// const GET_DIASPORA_LOCATIONS_QUERY = gql`
//   query GetDiasporaLocations {
//     diasporaLocations {
//       id
//       country
//       countryCode
//       region
//     }
//   }
// `;

// const GET_CITIES_QUERY = gql`
//   query GetCities {
//     cities {
//       cities {
//         id
//         name
//         postalCode
//         agglomeration
//         population
//       }
//       totalCount
//     }
//   }
// `;

// const REGISTER_MUTATION = gql`
//   mutation Register($input: RegisterInput!) {
//     register(input: $input) {
//       token
//       user {
//         id
//         email
//         firstName
//         lastName
//         role
//         isDiaspora
//           cityOfOrigin {
//             id
//             name
//           }
//           currentCity {
//             id
//             name
//           }
//           diasporaLocation {
//           id
//           country
//         }
//       }
//     }
//   }
// `;

// interface RegisterFormData {
//   email: string;
//   password: string;
//   confirmPassword: string;
//   firstName: string;
//   lastName: string;
//   isDiaspora: boolean;
//   // diasporaLocation: { id: string } | null;
//   diasporaLocationId: string;
//   // diasporaLocationId: string | undefined;
//   cityOfOrigin: { id: string };
//   currentCity: { id: string };
// }


// const schema = yup.object().shape({
//   email: yup.string().email('Invalid email').required('Email is required'),
//   password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//   confirmPassword: yup.string()
//     .oneOf([yup.ref('password'), undefined], 'Passwords must match')
//     .required('Confirm Password is required'),
//   firstName: yup.string().required('First name is required'),
//   lastName: yup.string().required('Last name is required'),
//   isDiaspora: yup.boolean().required('Please specify if you are in diaspora'),
//   diasporaLocationId: yup.string()
//   .default('')
//   .when('isDiaspora', {
//     is: true,
//     then: yup.string().required('Diaspora location is required when living abroad'),
//     otherwise: yup.string().nullable().optional()
//   }),
//   cityOfOrigin: yup.object().shape({
//     id: yup.string().required('City of origin is required')
//   }).required('City of origin is required'),
//   currentCity: yup.object().shape({
//     id: yup.string().required('Current city is required')
//   }).required('Current city is required'),
// });

// export default function RegisterPage() {
//   const router = useRouter();
//   const [registerUser, { loading, error }] = useMutation(REGISTER_MUTATION);
//   // const { data: citiesData, loading: citiesLoading } = useQuery<CitiesQueryResponse>(GET_CITIES_QUERY);
//   const { data: citiesData, loading: citiesLoading } = useQuery<{
//   cities: CitiesResponse;
// }>(GET_CITIES_QUERY);
//   const { data: diasporaData, loading: diasporaLoading, error: diasporaError } = useQuery<DiasporaLocationResponse>(GET_DIASPORA_LOCATIONS_QUERY);
//   const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm<RegisterFormData>({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       email: '',
//       password: '',
//       confirmPassword: '',
//       firstName: '',
//       lastName: '',
//       isDiaspora: false,
//       diasporaLocationId: '',
//       cityOfOrigin: { id: '' },
//       currentCity: { id: '' }
//     }
//   });

//   const showDiasporaDropdownRef = useRef(false);

//   // Add a new state for immediate diaspora visibility
//   const [showDiasporaSection, setShowDiasporaSection] = useState(false);

//   // Add a state to track if we need to show the dropdown
//   const [shouldShowDiasporaDropdown, setShouldShowDiasporaDropdown] = useState(false);

//   const [showOriginDropdown, setShowOriginDropdown] = useState(false);
//   const [showCurrentDropdown, setShowCurrentDropdown] = useState(false);
//   const [showDiasporaDropdown, setShowDiasporaDropdown] = useState(false);

//   const isDiaspora = watch('isDiaspora');
//   const selectedOriginId = watch('cityOfOrigin.id');
//   const selectedCurrentId = watch('currentCity.id');
//   const selectedDiasporaId = watch('diasporaLocationId');
//   const cityOfOriginValue = watch('cityOfOrigin');
//   const currentCityValue = watch('currentCity');

//   // Make sure these are finding the right cities
//   // Find the selected cities inside the component's render logic
//   // This ensures they are re-calculated on every render triggered by a form change

//   const selectedOriginCity = citiesData?.cities?.cities?.find(city => city.id === selectedOriginId);
//   // const selectedCurrentCity = citiesData?.cities?.cities?.find(city => city.id === selectedCurrentId);
//   const selectedDiasporaLocation = diasporaData?.diasporaLocations?.find(
//     (loc: any) => loc.id === selectedDiasporaId
//   );

//   useEffect(() => {
//   const originalError = console.error;
//   console.error = (...args) => {
//     if (args[0] && typeof args[0] === 'string' && args[0].includes('branch is not a function')) {
//       console.log('🔴 ERROR TRACE:', new Error().stack);
//     }
//     originalError.apply(console, args);
//   };
  
//   return () => {
//     console.error = originalError;
//   };
// }, []);

// //   const selectedOriginCity = useMemo(() => {
// //   return citiesData?.cities?.cities?.find(city => city.id === selectedOriginId);
// // }, [citiesData, selectedOriginId]);

// //   const selectedCurrentCity = useMemo(() => {
// //     return citiesData?.cities?.cities?.find(city => city.id === selectedCurrentId);
// //   }, [citiesData, selectedCurrentId]);


//   // useEffect(() => {
//   //   console.log('Selected Origin ID:', selectedOriginId);
//   //   console.log('Selected Origin City:', selectedOriginCity);
//   //   console.log('Selected Current ID:', selectedCurrentId);
//   //   console.log('Selected Current City:', selectedCurrentCity);
//   // }, [
//   //     selectedOriginId,
//   //     selectedCurrentId,
//   //     selectedOriginCity,
//   //     selectedCurrentCity
//   //   ]);

//   // useEffect(() => {
//   //   console.log('=== CITY SELECTION DEBUG ===');
//   //   console.log('Selected Origin ID:', selectedOriginId);
//   //   console.log('Selected Current ID:', selectedCurrentId);

//   //   // Find and log the actual selected cities
//   //   // const originCity2 = citiesData?.cities?.cities?.find(city => city.id === selectedOriginId);
//   //   // const currentCity2 = citiesData?.cities?.cities?.find(city => city.id === selectedCurrentId);

//   //   // console.log('Selected Origin City2:', originCity2);
//   //   // console.log('Selected Current City2:', currentCity2);
//   //   console.log('============================');
//   // }, [selectedOriginId, selectedCurrentId, citiesData]);

//   // 1. State management useEffect: to close other dropdowns when one opens
//   useEffect(() => {
//     // This ensures only one dropdown is open at a time
//     if (showDiasporaDropdown) {
//       setShowOriginDropdown(false);
//       setShowCurrentDropdown(false);
//     }
//     if (showOriginDropdown) {
//       setShowDiasporaDropdown(false);
//       setShowCurrentDropdown(false);
//     }
//     if (showCurrentDropdown) {
//       setShowDiasporaDropdown(false);
//       setShowOriginDropdown(false);
//     }
//   }, [showDiasporaDropdown, showOriginDropdown, showCurrentDropdown]);

//   // 2. useEffect for click outside handling - SIMPLIFIED
//   useEffect(() => {
//   const handleClickOutside = (event: MouseEvent) => {
//     const target = event.target as HTMLElement;
    
//     // Only close if click is outside ANY dropdown container
//     const isClickInsideAnyDropdown = target.closest('.dropdown-container');
    
//     if (!isClickInsideAnyDropdown) {
//       setShowDiasporaDropdown(false);
//       setShowOriginDropdown(false);
//       setShowCurrentDropdown(false);
//     }
//   };

//   document.addEventListener('mousedown', handleClickOutside);
//   return () => {
//     document.removeEventListener('mousedown', handleClickOutside);
//   };
// }, []);

//   // 3. DEBUG useEffect
//   useEffect(() => {
//     console.log('isDiaspora changed:', isDiaspora);
//     console.log('showDiasporaDropdown:', showDiasporaDropdown);
//     console.log('Diaspora data loaded:', !!diasporaData);
//     console.log('Diaspora locations count:', diasporaData?.diasporaLocations?.length);
//   }, [isDiaspora, showDiasporaDropdown, diasporaData]);

//   // // 4. useEffect to auto-show diaspora dropdown when data loads
//   // useEffect(() => {
//   //   if (isDiaspora && diasporaData && !diasporaLoading && shouldShowDiasporaDropdown) {
//   //     setShowDiasporaDropdown(true);
//   //     setShouldShowDiasporaDropdown(false);
//   //   }
//   // }, [isDiaspora, diasporaData, diasporaLoading, shouldShowDiasporaDropdown]);

//   // 4. useEffect to auto-show diaspora dropdown when data loads
// useEffect(() => {
//   if (isDiaspora && diasporaData && !diasporaLoading) {
//     if (shouldShowDiasporaDropdown) {
//       setShowDiasporaDropdown(true);
//       setShouldShowDiasporaDropdown(false);
//     }
//   }
// }, [isDiaspora, diasporaData, diasporaLoading, shouldShowDiasporaDropdown]);

//   // 5. debug useEffect to see if the values are being set correctly when you select cities from the dropdowns

//   // useEffect(() => {
//   //   console.log('Selected Origin ID:', selectedOriginId);
//   //   console.log('Selected Origin City:', selectedOriginCity);
//   //   console.log('Selected Current ID:', selectedCurrentId);
//   //   console.log('Selected Current City:', selectedCurrentCity);
//   // }, [selectedOriginId, selectedCurrentId, selectedOriginCity, selectedCurrentCity]);


// //   useEffect(() => {
// //   console.log('Cities data structure:', citiesData);
// //   if (citiesData) {
// //     console.log('Cities array:', citiesData.cities?.cities);
// //     console.log('Selected OriginCity id:', citiesData.cities?.cities[1].id);
// //     console.log('Selected CurrentCity id:', selectedCurrentId);
// //     console.log('Total count:', citiesData.cities?.totalCount);
// //   }
// // }, [citiesData, selectedCurrentId]);


// // New attempt of debugging:

// // 1. Debug form values changes
// useEffect(() => {
//   console.log('FORM VALUES CHANGED:');
//   console.log('Origin City ID:', selectedOriginId);
//   console.log('Current City ID:', selectedCurrentId);
//   console.log('Diaspora ID:', selectedDiasporaId);
//   console.log('Is Diaspora:', isDiaspora);
// }, [selectedOriginId, selectedCurrentId, selectedDiasporaId, isDiaspora]);

// // 2. Debug city selection specifically
// useEffect(() => {
//   if (selectedOriginId && selectedOriginId !== '') {
//     const city = citiesData?.cities?.cities?.find(c => c.id === selectedOriginId);
//     console.log('ORIGIN CITY SELECTED:');
//     console.log('ID:', selectedOriginId);
//     console.log('City Object:', city);
//   }
// }, [selectedOriginId, citiesData]);

// useEffect(() => {
//   if (selectedCurrentId && selectedCurrentId !== '') {
//     const city = citiesData?.cities?.cities?.find(c => c.id === selectedCurrentId);
//     console.log('CURRENT CITY SELECTED:');
//     console.log('ID:', selectedCurrentId);
//     console.log('City Object:', city);
//   }
// }, [selectedCurrentId, citiesData]);

// // 3. Debug the actual dropdown click events (add to your click handlers)
// // const handleOriginCitySelect = (city: any) => {
// //   console.log('🟢 ORIGIN CITY CLICKED:', city.id, city.name);
  
// //   // Use shouldValidate: true to trigger validation and ensure the value is set
// //   setValue('cityOfOrigin', { id: city.id }, { shouldValidate: true, shouldDirty: true });
  
// //   // Force a re-render by updating state
// //   setShowOriginDropdown(false);
  
// //   // Log immediately after setting to verify
// //   setTimeout(() => {
// //     console.log('🟢 Immediately after setValue - cityOfOrigin:', watch('cityOfOrigin'));
// //   }, 0);
// // };

// // const handleCurrentCitySelect = (city: any) => {
// //   console.log('🔵 CURRENT CITY CLICKED:', city.id, city.name);
  
// //   // Use the same options for consistency
// //   setValue('currentCity', { id: city.id }, { shouldValidate: true, shouldDirty: true });
  
// //   setShowCurrentDropdown(false);
  
// //   setTimeout(() => {
// //     console.log('🔵 Immediately after setValue - currentCity:', watch('currentCity'));
// //   }, 0);
// // };

// // More targeted debugging
// // useEffect(() => {
// //   if (selectedOriginId || selectedCurrentId) {
// //     console.log('=== CITY SELECTION UPDATE ===');
// //     console.log('selectedOriginId:', selectedOriginId);
// //     console.log('selectedCurrentId:', selectedCurrentId);
// //     console.log('cityOfOrigin object:', watch('cityOfOrigin'));
// //     console.log('currentCity object:', watch('currentCity'));
    
// //     const originCity = citiesData?.cities?.cities?.find(c => c.id === selectedOriginId);
// //     const currentCity = citiesData?.cities?.cities?.find(c => c.id === selectedCurrentId);
// //     console.log('Found Origin City:', originCity);
// //     console.log('Found Current City:', currentCity);
// //     console.log('============================');
// //   }
// // }, [selectedOriginId, selectedCurrentId, watch, citiesData?.cities?.cities]);

// // Debug diaspora dropdown behavior
// useEffect(() => {
//   console.log('=== DIASPORA DROPDOWN DEBUG Sept 23rd ===');
//   console.log('isDiaspora:', isDiaspora);
//   console.log('diasporaData loaded:', !!diasporaData);
//   console.log('diasporaLoading:', diasporaLoading);
//   console.log('shouldShowDiasporaDropdown:', shouldShowDiasporaDropdown);
//   console.log('showDiasporaDropdown:', showDiasporaDropdown);
//   console.log('================================');
// }, [isDiaspora, diasporaData, diasporaLoading, shouldShowDiasporaDropdown, showDiasporaDropdown]);

// // 4. useEffect to auto-show diaspora dropdown when data loads
// useEffect(() => {
//   if (isDiaspora && diasporaData && !diasporaLoading) {
//     if (shouldShowDiasporaDropdown) {
//       setShowDiasporaDropdown(true);
//       setShouldShowDiasporaDropdown(false);
//     }
//   }
// }, [isDiaspora, diasporaData, diasporaLoading, shouldShowDiasporaDropdown]);

// useEffect(() => {
//   const subscription = watch((value) => {
//     console.log('FORM VALUES:', value);
//   });
//   return () => subscription.unsubscribe();
// }, [watch]);


//   const onSubmit = async (data: RegisterFormData) => {
//     console.log('Form data being sent:', data);
//     console.log('Form data being sent:', JSON.stringify(data, null, 2));
//     try {
//       const { data: response } = await registerUser({
//         variables: {
//           input: {
//             email: data.email,
//             password: data.password,
//             firstName: data.firstName,
//             lastName: data.lastName,
//             isDiaspora: data.isDiaspora,
//             diasporaLocation: data.isDiaspora && data.diasporaLocationId
//             ? { id: data.diasporaLocationId }
//             : undefined,
//             cityOfOrigin: { id: data.cityOfOrigin.id },
//             currentCity: { id: data.currentCity.id },
//           }
//         }
//       });

//       if (response?.register?.token) {
//         setAuthToken(response.register.token);
//         router.push('/profile');
//       }
//     } catch (err) {
//       console.error('Full error:', err);
//       // console.error('GraphQL errors:', err.graphQLErrors);
//       // console.error('Network error:', err.networkError);

//       // if (err.networkError?.result?.errors) {
//       //   console.error('Server errors:', err.networkError.result.errors);
//       }
//   };

//   return (
//     <PublicLayout>
//       <div className="max-w-md mx-auto py-12 px-4">
//         <Link href="/" className="flex items-center text-yellow-300 mb-6 hover:underline">
//           <FiArrowLeft className="mr-2" /> Retour à l'accueil
//         </Link>

//         <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
//           <h1 className="text-2xl font-bold text-yellow-300 mb-6">Kréyé kont' ou</h1>

//           {error && (
//             <div className="mb-4 p-3 bg-red-500 text-white rounded">
//               {error.message}
//             </div>
//           )}

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             {/* Email Field */}
//             <div>
//               <label htmlFor="email" className="block text-yellow-300 mb-1">Mèl ou Pipiri</label>
//               <input
//                 {...register("email")}
//                 type="email"
//                 className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
//                 disabled={loading}
//               />
//               {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
//             </div>

//             {/* Password Field */}
//             <div>
//               <label htmlFor="password" className="block text-yellow-300 mb-1">Mod'pas'</label>
//               <input
//                 {...register("password")}
//                 type="password"
//                 className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
//                 disabled={loading}
//               />
//               {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <label htmlFor="confirmPassword" className="block text-yellow-300 mb-1">Anko an fwa mod'pas' la</label>
//               <input
//                 {...register("confirmPassword")}
//                 type="password"
//                 className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
//                 disabled={loading}
//               />
//               {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>}
//             </div>

//             {/* First Name */}
//             <div>
//               <label htmlFor="firstName" className="block text-yellow-300 mb-1">Non</label>
//               <input
//                 {...register("firstName")}
//                 className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
//                 disabled={loading}
//               />
//               {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>}
//             </div>

//             {/* Last Name */}
//             <div>
//               <label htmlFor="lastName" className="block text-yellow-300 mb-1">Siyati</label>
//               <input
//                 {...register("lastName")}
//                 className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
//                 disabled={loading}
//               />
//               {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>}
//             </div>

//             {/* Diaspora Field */}
//             <div>
//               <label className="flex items-center text-yellow-300 mb-1">
//                 <input
//                   type="checkbox"
//                   {...register("isDiaspora")}
//                   className="mr-2"
//                   disabled={loading}
//                   onChange={(e) => {
//                     const isChecked = e.target.checked;
//                     console.log('🟡 DIASPORA CHECKBOX CHANGED:', isChecked);
                    
//                     // Control section visibility immediately
//                     setShowDiasporaSection(isChecked);
                    
//                     if (isChecked) {
//                       if (diasporaData && !diasporaLoading) {
//                         console.log('🟡 Showing diaspora dropdown immediately');
//                         // Update both ref and state
//                         showDiasporaDropdownRef.current = true;
//                         setShowDiasporaDropdown(true);
//                       } else {
//                         setShouldShowDiasporaDropdown(true);
//                       }
//                     } else {
//                       setValue('diasporaLocationId', '');
//                       showDiasporaDropdownRef.current = false;
//                       setShowDiasporaDropdown(false);
//                       setShouldShowDiasporaDropdown(false);
//                     }
//                   }}
//                 />
//                 Mwen ka rété an dyaspora (pa an Matinik)
//               </label>
//               {errors.isDiaspora && <p className="text-red-400 text-sm mt-1">{errors.isDiaspora.message}</p>}
//             </div>

//             {/* Diaspora Location Dropdown - Only shown when isDiaspora is true */}
//             {showDiasporaSection && (
//               <div className="relative py-4 dropdown-container">
//                 <div style={{ background: 'red', padding: '5px', marginBottom: '10px' }}>
//                   DEBUG: Diaspora section is rendering - showDiasporaSection: {showDiasporaSection.toString()}, showDiasporaDropdown: {showDiasporaDropdown.toString()}, ref: {showDiasporaDropdownRef.current.toString()}
//                 </div>
//                 <label className="block text-yellow-300 mb-1">
//                   Kote ou ka rété an dyaspora la
//                 </label>

//                 {/* Show loading state while data is being fetched */}
//                 {diasporaLoading && (
//                   <div className="w-full px-4 py-2 bg-gray-700 text-white rounded">
//                     Chajman diaspora locations...
//                   </div>
//                 )}

//                 {/* Only show dropdown when data is loaded */}
//                 {!diasporaLoading && diasporaData && (
//                   <>
//                     <div
//                       className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300 cursor-pointer flex justify-between items-center"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setShowDiasporaDropdown(!showDiasporaDropdown);
//                       }}
//                     >
//                       <span>{selectedDiasporaLocation ? selectedDiasporaLocation.country : "Chwazi yon peyi"}</span>
//                       <FiChevronDown />
//                     </div>

//                     {(showDiasporaDropdown || showDiasporaDropdownRef.current) && (
//                       <div 
//                         className="absolute z-50 w-full mt-1 bg-gray-700 border border-gray-600 rounded shadow-lg max-h-60 overflow-y-auto dropdown-container"
//                         style={{ 
//                           border: '2px solid green',
//                           display: 'block',
//                           opacity: 1,
//                           visibility: 'visible',
//                           position: 'absolute',
//                           top: '100%',
//                           left: '0'
//                         }}
//                       >
//                         <div style={{ background: 'yellow', color: 'black', padding: '5px' }}>
//                           DEBUG: Dropdown is visible - showDiasporaDropdown: {showDiasporaDropdown.toString()}, ref: {showDiasporaDropdownRef.current.toString()}
//                         </div>
//                         {diasporaData.diasporaLocations?.length === 0 ? (
//                           <div className="p-2 text-white">Pa gen okenn kote diaspora ki disponib</div>
//                         ) : (
//                           diasporaData.diasporaLocations?.map((location) => (
//                             <div
//                               key={location.id}
//                               className="p-2 hover:bg-gray-600 cursor-pointer text-white"
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 setValue('diasporaLocationId', location.id);
//                                 setShowDiasporaDropdown(false);
//                               }}
//                             >
//                               {location.country} {location.region && `(${location.region})`}
//                             </div>
//                           ))
//                         )}
//                       </div>
//                     )}
//                   </>
//                 )}

//                 <input type="hidden" {...register("diasporaLocationId")} />
//                 {errors.diasporaLocationId && <p className="text-red-400 text-sm mt-1">{errors.diasporaLocationId.message}</p>}
//                 {diasporaError && (
//                   <div className="mb-4 p-3 bg-red-500 text-white rounded">
//                     Diaspora locations error: {diasporaError.message}
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* City of Origin Dropdown */}
//             <div className="relative dropdown-container">
//               <label htmlFor="cityOfOrigin" className="block text-yellow-300 mb-1">Kote ou sòti</label>
//               <div
//                 className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300 cursor-pointer flex justify-between items-center"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setShowOriginDropdown(!showOriginDropdown);
//                 }}
//               >
//                 <span>{citiesData?.cities?.cities?.find(city => city.id === selectedOriginId)?.name || "Chwazi yon vil"}</span>
//                 <FiChevronDown />
//               </div>
              
//               {showOriginDropdown && (
//                 <div 
//                   className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded shadow-lg max-h-60 overflow-y-auto dropdown-container"
//                   onClick={(e) => e.stopPropagation()} // Prevent clicks inside dropdown from closing it
//                 >
//                   {citiesLoading ? (
//                     <div className="p-2 text-white">Chajman...</div>
//                   ) : (
//                     citiesData?.cities?.cities?.map((city) => (
//                       <div
//                         key={city.id}
//                         className="p-2 hover:bg-gray-600 cursor-pointer text-white"
//                         onClick={() => {
//                           console.log('🟢 CITY CLICKED:', city.id, city.name);

//                           // SIMPLEST APPROACH - Just set the value without complex options
//                           setValue('cityOfOrigin.id', city.id);

//                           setShowOriginDropdown(false);
                          
//                           // Immediate verification
//                           setTimeout(() => {
//                             console.log('🟢 VERIFICATION - selectedOriginId:', watch('cityOfOrigin.id'));
//                           }, 0);
//                         }}
//                       >
//                         {city.name} ({city.postalCode})
//                       </div>
//                     ))
//                   )}
//                 </div>
//               )}
//               <input type="hidden" {...register("cityOfOrigin.id")} />
//               {errors.cityOfOrigin?.id && <p className="text-red-400 text-sm mt-1">{errors.cityOfOrigin.id.message}</p>}
//             </div>

//             {/* Current City Dropdown */}
//             <div className="relative dropdown-container">
//               <label htmlFor="currentCity" className="block text-yellow-300 mb-1">Kote ou retè</label>
//               <div
//                 className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300 cursor-pointer flex justify-between items-center"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setShowCurrentDropdown(!showCurrentDropdown);
//                 }}
//               >
//                 <span>{citiesData?.cities?.cities?.find(city => city.id === selectedCurrentId)?.name || "Chwazi yon vil"}</span>
//                 <FiChevronDown />
//               </div>
              
//               {showCurrentDropdown && (
//                 <div 
//                   className="absolute z-30 w-full mt-1 bg-gray-700 border border-gray-600 rounded shadow-lg max-h-60 overflow-y-auto dropdown-container"
//                   onClick={(e) => e.stopPropagation()} // Prevent clicks inside dropdown from closing it
//                 >
//                   {citiesLoading ? (
//                     <div className="p-2 text-white">Chajman...</div>
//                   ) : (
//                     citiesData?.cities?.cities?.map((city) => (
//                       <div
//                         key={city.id}
//                         className="p-2 hover:bg-gray-600 cursor-pointer text-white"
//                         onClick={() => {
//                           console.log('🔵 CITY CLICKED:', city.id, city.name);

//                           // SIMPLEST APPROACH - Just set the value without complex options
//                           setValue('currentCity.id', city.id);

//                           setShowCurrentDropdown(false);
                          
//                           // Immediate verification
//                           setTimeout(() => {
//                             console.log('🔵 VERIFICATION - selectedCurrentId:', watch('currentCity.id'));
//                           }, 0);
//                         }}
//                       >
//                         {city.name} ({city.postalCode})
//                       </div>
//                     ))
//                   )}
//                 </div>
//               )}
//               <input type="hidden" {...register("currentCity.id")} />
//               {errors.currentCity?.id && <p className="text-red-400 text-sm mt-1">{errors.currentCity.id.message}</p>}
//             </div>

//             <button
//               type="submit"
//               disabled={loading || citiesLoading}
//               className="w-full bg-yellow-300 text-gray-800 py-2 px-4 rounded font-bold hover:bg-yellow-400 transition-colors"
//             >
//               {loading ? 'Ap soumèt...' : 'Réjistré'}
//             </button>
//           </form>

//           <p className="mt-6 text-center text-yellow-300">
//             Ou za ni an kont'?{' '}
//             <Link href="/auth/login" className="font-bold hover:underline">
//               Konèkté
//             </Link>
//           </p>
//         </div>
//       </div>
//     </PublicLayout>
//   );
// }


import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiArrowLeft, FiChevronDown } from 'react-icons/fi';
import Link from 'next/link';
import PublicLayout from '../../components/Layout/PublicLayout';
import { setAuthToken } from '../../lib/auth';
import { gql } from '@apollo/client';
import { useEffect, useState, useRef } from 'react';
import { CitiesResponse } from '../../types';

interface DiasporaLocation {
  id: string;
  country: string;
  countryCode: string;
  region?: string;
}

interface DiasporaLocationResponse {
  diasporaLocations: DiasporaLocation[];
}

const GET_DIASPORA_LOCATIONS_QUERY = gql`
  query GetDiasporaLocations {
    diasporaLocations {
      id
      country
      countryCode
      region
    }
  }
`;

const GET_CITIES_QUERY = gql`
  query GetCities {
    cities {
      cities {
        id
        name
        postalCode
        agglomeration
        population
      }
      totalCount
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        id
        email
        firstName
        lastName
        role
        isDiaspora
        cityOfOrigin {
          id
          name
        }
        currentCity {
          id
          name
        }
        diasporaLocation {
          id
          country
        }
      }
    }
  }
`;

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  isDiaspora: boolean;
  diasporaLocationId: string;
  cityOfOrigin: { id: string };
  currentCity: { id: string };
}

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  isDiaspora: yup.boolean().required('Please specify if you are in diaspora'),
  diasporaLocationId: yup.string().nullable(),
  cityOfOrigin: yup.object().shape({
    id: yup.string().required('City of origin is required')
  }).required('City of origin is required'),
  currentCity: yup.object().shape({
    id: yup.string().required('Current city is required')
  }).required('Current city is required'),
}).test('diaspora-required', 'Diaspora location is required when living abroad', function(value) {
  // Custom validation for diaspora location
  if (value.isDiaspora && !value.diasporaLocationId) {
    return this.createError({
      path: 'diasporaLocationId',
      message: 'Diaspora location is required when living abroad'
    });
  }
  return true;
});

export default function RegisterPage() {
  const router = useRouter();
  const [registerUser, { loading, error }] = useMutation(REGISTER_MUTATION);
  const { data: citiesData, loading: citiesLoading } = useQuery<{ cities: CitiesResponse }>(GET_CITIES_QUERY);
  const { data: diasporaData, loading: diasporaLoading, error: diasporaError } = useQuery<DiasporaLocationResponse>(GET_DIASPORA_LOCATIONS_QUERY);
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<RegisterFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(schema) as any,
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      isDiaspora: false,
      diasporaLocationId: '',
      cityOfOrigin: { id: '' },
      currentCity: { id: '' }
    }
  });

  const showDiasporaDropdownRef = useRef(false);
  const [showDiasporaSection, setShowDiasporaSection] = useState(false);
  const [shouldShowDiasporaDropdown, setShouldShowDiasporaDropdown] = useState(false);
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showCurrentDropdown, setShowCurrentDropdown] = useState(false);
  const [showDiasporaDropdown, setShowDiasporaDropdown] = useState(false);

  const isDiaspora = watch('isDiaspora');
  const selectedOriginId = watch('cityOfOrigin.id');
  const selectedCurrentId = watch('currentCity.id');
  const selectedDiasporaId = watch('diasporaLocationId');

  // const selectedOriginCity = citiesData?.cities?.cities?.find(city => city.id === selectedOriginId);
  const selectedDiasporaLocation = diasporaData?.diasporaLocations?.find((loc: DiasporaLocation) => loc.id === selectedDiasporaId);

  // Close other dropdowns when one opens
  useEffect(() => {
    if (showDiasporaDropdown) {
      setShowOriginDropdown(false);
      setShowCurrentDropdown(false);
    }
    if (showOriginDropdown) {
      setShowDiasporaDropdown(false);
      setShowCurrentDropdown(false);
    }
    if (showCurrentDropdown) {
      setShowDiasporaDropdown(false);
      setShowOriginDropdown(false);
    }
  }, [showDiasporaDropdown, showOriginDropdown, showCurrentDropdown]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isClickInsideAnyDropdown = target.closest('.dropdown-container');
      
      if (!isClickInsideAnyDropdown) {
        setShowDiasporaDropdown(false);
        setShowOriginDropdown(false);
        setShowCurrentDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Auto-show diaspora dropdown when data loads
  useEffect(() => {
    if (isDiaspora && diasporaData && !diasporaLoading) {
      if (shouldShowDiasporaDropdown) {
        setShowDiasporaDropdown(true);
        setShouldShowDiasporaDropdown(false);
      }
    }
  }, [isDiaspora, diasporaData, diasporaLoading, shouldShowDiasporaDropdown]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log('🟢 Starting form submission...');
    
      // Log the complete input structure
    const input = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      isDiaspora: data.isDiaspora,
      diasporaLocation: data.isDiaspora && data.diasporaLocationId
        ? { id: data.diasporaLocationId }
        : undefined,
      cityOfOrigin: { id: data.cityOfOrigin.id },
      currentCity: { id: data.currentCity.id },
    };

    console.log('🟢 Complete input object:', JSON.stringify(input, null, 2));
    console.log('🟢 diasporaLocation value:', input.diasporaLocation);
    console.log('🟢 cityOfOrigin value:', input.cityOfOrigin);
    console.log('🟢 currentCity value:', input.currentCity);

    const { data: response } = await registerUser({
      variables: { input }
    });

    console.log('🟢 Registration successful:', response);

    if (response?.register?.token) {
      setAuthToken(response.register.token);
      router.push('/profile');
    }
  } catch (err) {
    console.error('🔴 Full error object:', err);
    // console.error('🔴 Error message:', err.message);
    // console.error('🔴 Error stack:', err.stack);

    // Properly type the error
  if (err instanceof Error) {
    console.error('🔴 Error message:', err.message);        
    console.error('🔴 Error stack:', err.stack);
  } else {
    console.error('🔴 Unknown error type:', err);
  }
    
    // // Check for GraphQL specific errors
    // if (err.graphQLErrors) {
    //   console.error('🔴 GraphQL Errors:', err.graphQLErrors);
    // }
    // if (err.networkError) {
    //   console.error('🔴 Network Error:', err.networkError);
    // }
  }
};

  return (
    <PublicLayout>
      <div className="max-w-md mx-auto py-12 px-4">
        <Link href="/" className="flex items-center text-yellow-300 mb-6 hover:underline">
          <FiArrowLeft className="mr-2" /> Retour à l&apos;accueil
        </Link>

        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-yellow-300 mb-6">Kréyé kont&apos; ou</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-500 text-white rounded">
              {error.message}
            </div>
          )}

          <form onSubmit={(e) => {
            e.preventDefault();
            console.log('🟢 Form submit event triggered');
            try {
              handleSubmit(onSubmit)(e);
            } catch (submitError) {
              console.error('🔴 Form submission error:', submitError);
            } 
            
            }} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-yellow-300 mb-1">Mèl ou Pipiri</label>
              <input
                {...register("email")}
                type="email"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
                disabled={loading}
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-yellow-300 mb-1">Mod&apos; pas&apos;</label>
              <input
                {...register("password")}
                type="password"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
                disabled={loading}
              />
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-yellow-300 mb-1">Anko an fwa mod&apos; pas&apos;la</label>
              <input
                {...register("confirmPassword")}
                type="password"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
                disabled={loading}
              />
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-yellow-300 mb-1">Non</label>
              <input
                {...register("firstName")}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
                disabled={loading}
              />
              {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-yellow-300 mb-1">Siyati</label>
              <input
                {...register("lastName")}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
                disabled={loading}
              />
              {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>}
            </div>

            {/* Diaspora Field */}
            <div>
              <label className="flex items-center text-yellow-300 mb-1">
                <input
                  type="checkbox"
                  {...register("isDiaspora")}
                  className="mr-2"
                  disabled={loading}
                  // option 1 - automatically opening the diaspora location dropdown menu:
                  // onChange={(e) => {
                  //   const isChecked = e.target.checked;
                  //   setShowDiasporaSection(isChecked);
                    
                  //   if (isChecked) {
                  //     if (diasporaData && !diasporaLoading) {
                  //       showDiasporaDropdownRef.current = true;
                  //       setShowDiasporaDropdown(true);
                  //     } else {
                  //       setShouldShowDiasporaDropdown(true);
                  //     }
                  //   } else {
                  //     setValue('diasporaLocationId', '');
                  //     showDiasporaDropdownRef.current = false;
                  //     setShowDiasporaDropdown(false);
                  //     setShouldShowDiasporaDropdown(false);
                  //   }
                  // }}

                  // option 2 - not automatically opening the diaspora loc dropdown menu:
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setShowDiasporaSection(isChecked);
                    
                    if (isChecked) {
                      // Only show the section, but don't open the dropdown
                      if (diasporaData && !diasporaLoading) {
                        // Don't automatically open the dropdown
                        showDiasporaDropdownRef.current = false; // Ensure ref is false
                        setShowDiasporaDropdown(false); // Ensure state is false
                      } else {
                        setShouldShowDiasporaDropdown(false); // Don't set this flag either
                      }
                    } else {
                      setValue('diasporaLocationId', '');
                      showDiasporaDropdownRef.current = false;
                      setShowDiasporaDropdown(false);
                      setShouldShowDiasporaDropdown(false);
                    }
                  }}

                />
                Mwen ka rété an dyaspora (pa an Matinik)
              </label>
              {errors.isDiaspora && <p className="text-red-400 text-sm mt-1">{errors.isDiaspora.message}</p>}
            </div>

            {/* Diaspora Location Dropdown */}
            {showDiasporaSection && (
              <div className="relative py-4 dropdown-container">
                <label className="block text-yellow-300 mb-1">
                  Kote ou ka rété an dyaspora la
                </label>

                {diasporaLoading && (
                  <div className="w-full px-4 py-2 bg-gray-700 text-white rounded">
                    Chajman diaspora locations...
                  </div>
                )}

                {!diasporaLoading && diasporaData && (
                  <>
                    <div
                      className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300 cursor-pointer flex justify-between items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newState = !showDiasporaDropdown;
                        setShowDiasporaDropdown(newState);
                        showDiasporaDropdownRef.current = newState;
                      }}
                    >
                      <span>{selectedDiasporaLocation ? selectedDiasporaLocation.country : "Chwazi yon peyi"}</span>
                      <FiChevronDown />
                    </div>

                    {(showDiasporaDropdown || showDiasporaDropdownRef.current) && (
                      <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded shadow-lg max-h-60 overflow-y-auto dropdown-container">
                        {diasporaData.diasporaLocations?.length === 0 ? (
                          <div className="p-2 text-white">Pa gen okenn kote diaspora ki disponib&apos;</div>
                        ) : (
                          diasporaData.diasporaLocations?.map((location) => (
                            <div
                              key={location.id}
                              className="p-2 hover:bg-gray-600 cursor-pointer text-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                setValue('diasporaLocationId', location.id);
                                setShowDiasporaDropdown(false);
                                showDiasporaDropdownRef.current = false;
                              }}
                            >
                              {location.country} {location.region && `(${location.region})`}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </>
                )}

                <input type="hidden" {...register("diasporaLocationId")} />
                {errors.diasporaLocationId && <p className="text-red-400 text-sm mt-1">{errors.diasporaLocationId.message}</p>}
                {diasporaError && (
                  <div className="mb-4 p-3 bg-red-500 text-white rounded">
                    Diaspora locations error: {diasporaError.message}
                  </div>
                )}
              </div>
            )}

            {/* City of Origin Dropdown */}
            <div className="relative dropdown-container">
              <label htmlFor="cityOfOrigin" className="block text-yellow-300 mb-1">Kote ou sòti</label>
              <div
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300 cursor-pointer flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowOriginDropdown(!showOriginDropdown);
                }}
              >
                <span>{citiesData?.cities?.cities?.find(city => city.id === selectedOriginId)?.name || "Chwazi yon vil"}</span>
                <FiChevronDown />
              </div>
              
              {showOriginDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded shadow-lg max-h-60 overflow-y-auto dropdown-container">
                  {citiesLoading ? (
                    <div className="p-2 text-white">Chajman...</div>
                  ) : (
                    citiesData?.cities?.cities?.map((city) => (
                      <div
                        key={city.id}
                        className="p-2 hover:bg-gray-600 cursor-pointer text-white"
                        onClick={() => {
                          setValue('cityOfOrigin.id', city.id);
                          setShowOriginDropdown(false);
                        }}
                      >
                        {city.name} ({city.postalCode})
                      </div>
                    ))
                  )}
                </div>
              )}
              <input type="hidden" {...register("cityOfOrigin.id")} />
              {errors.cityOfOrigin?.id && <p className="text-red-400 text-sm mt-1">{errors.cityOfOrigin.id.message}</p>}
            </div>

            {/* Current City Dropdown */}
            <div className="relative dropdown-container">
              <label htmlFor="currentCity" className="block text-yellow-300 mb-1">Kote ou retè</label>
              <div
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300 cursor-pointer flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCurrentDropdown(!showCurrentDropdown);
                }}
              >
                <span>{citiesData?.cities?.cities?.find(city => city.id === selectedCurrentId)?.name || "Chwazi yon vil"}</span>
                <FiChevronDown />
              </div>
              
              {showCurrentDropdown && (
                <div className="absolute z-30 w-full mt-1 bg-gray-700 border border-gray-600 rounded shadow-lg max-h-60 overflow-y-auto dropdown-container">
                  {citiesLoading ? (
                    <div className="p-2 text-white">Chajman...</div>
                  ) : (
                    citiesData?.cities?.cities?.map((city) => (
                      <div
                        key={city.id}
                        className="p-2 hover:bg-gray-600 cursor-pointer text-white"
                        onClick={() => {
                          setValue('currentCity.id', city.id);
                          setShowCurrentDropdown(false);
                        }}
                      >
                        {city.name} ({city.postalCode})
                      </div>
                    ))
                  )}
                </div>
              )}
              <input type="hidden" {...register("currentCity.id")} />
              {errors.currentCity?.id && <p className="text-red-400 text-sm mt-1">{errors.currentCity.id.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading || citiesLoading}
              className="w-full bg-yellow-300 text-gray-800 py-2 px-4 rounded font-bold hover:bg-yellow-400 transition-colors"
            >
              {loading ? 'Ap soumèt...' : 'Réjistré'}
            </button>
          </form>

          <p className="mt-6 text-center text-yellow-300">
            Ou za ni an kont&apos; ?{' '}
            <Link href="/auth/login" className="font-bold hover:underline">
              Konèkté
            </Link>
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}