import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { gql } from '@apollo/client';
import Image from 'next/image';
import { isAuthenticated } from '../../lib/auth';
import PrivateLayout from '../../components/Layout/PrivateLayout';

const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      firstName
      lastName
      nickname
      profileImage
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
      role
      createdAt
    }
  }
`;

const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      id
      nickname
      profileImage
      updatedAt
    }
  }
`;

export default function EditProfilePage() {
  const router = useRouter();
  const { loading, error, data } = useQuery(ME_QUERY);
  const [updateProfile, { loading: updating }] = useMutation(UPDATE_PROFILE_MUTATION);
  
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
    }
  }, [router]);

  useEffect(() => {
    if (data?.me) {
      setNickname(data.me.nickname || '');
      setProfileImage(data.me.profileImage || '');
    }
  }, [data]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setProfileImage(result.url);
      } else {
        alert('Upload failed: ' + result.error);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        variables: {
          input: {
            nickname: nickname || null,
            profileImage: profileImage || null
          }
        }
      });
      router.push('/profile');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Error updating profile');
    }
  };

  const removeProfileImage = () => {
    setProfileImage('');
  };

  if (loading) return <PrivateLayout><div>Loading...</div></PrivateLayout>;
  if (error) return <PrivateLayout><div>Error: {error.message}</div></PrivateLayout>;

  return (
    <PrivateLayout>
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-yellow-300">
          <h1 className="text-2xl font-bold mb-6">Modifyé Pwofil aw'</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Foto Pwofil
              </label>
              
              {/* Current Profile Image */}
              {profileImage ? (
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-300">
                    <Image 
                      src={profileImage} 
                      alt="Preview" 
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={removeProfileImage}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Efasé foto
                  </button>
                </div>
              ) : (
                <div className="flex justify-center">
                  <div className="w-32 h-32 rounded-full bg-gray-600 border-4 border-yellow-300 flex items-center justify-center">
                    <span className="text-4xl text-white font-bold">
                      {data?.me?.firstName?.[0]}{data?.me?.lastName?.[0]}
                    </span>
                  </div>
                </div>
              )}

              {/* File Upload Input */}
              <div className="mt-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="profile-image-upload"
                />
                <label
                  htmlFor="profile-image-upload"
                  className="block w-full bg-yellow-300 text-gray-800 text-center py-2 rounded font-bold hover:bg-yellow-400 transition-colors cursor-pointer"
                >
                  {uploading ? 'Ap téléchargé...' : 'Chwazi yon foto'}
                </label>
                <p className="text-sm text-gray-400 mt-2 text-center">
                  JPG, PNG, GIF • Max 5MB
                </p>
              </div>
            </div>

            {/* Nickname Field */}
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium mb-2">
                Surnom (optionnel)
              </label>
              <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                placeholder="Surnom ou"
              />
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={updating || uploading}
                className="bg-yellow-300 text-gray-800 px-4 py-2 rounded font-bold hover:bg-yellow-400 transition-colors disabled:opacity-50"
              >
                {updating ? 'Ap modifyé...' : 'Sové chanjman'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/profile')}
                className="bg-gray-600 text-white px-4 py-2 rounded font-bold hover:bg-gray-700 transition-colors"
              >
                Annulé
              </button>
            </div>
          </form>
        </div>
      </div>
    </PrivateLayout>
  );
}