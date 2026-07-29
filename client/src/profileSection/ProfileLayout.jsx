import React, { useState, useEffect } from "react";
import ProfileSidebar from "./ProfileSidebar";
import EditProfile from "./EditProfile";
import ProfileOverview from "./ProfileOverview";
import ChangePassword from "./ChangePassword";

import ErrorModal from "../ReusableCards/ErrorModal.jsx";
import SuccessModal from "../ReusableCards/SuccessModal.jsx";

// =======================================================
// MAIN PROFILE LAYOUT COMPONENT
// =======================================================

const ProfileLayout = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔴 🟢 Modals State
  const [errorMsg, setErrorMsg] = useState("");
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const triggerError = (msg) => {
    setErrorMsg(msg);
    setIsErrorOpen(true);
  };

  const triggerSuccess = (msg) => {
    setSuccessMsg(msg);
    setIsSuccessOpen(true);
  };

  // Main Loader & Fetcher (real backend calls)
  // Step 1: verify-token -> get logged-in user's email
  // Step 2: get-user-data -> fetch full profile using that email
  async function fetchUserProfile() {
    setLoading(true);
    try {
      // Step 1: Verify Session / Token
      const authResponse = await fetch("http://localhost:5000/auth/verify-token", {
        method: "POST",
        credentials: "include",
      });
      const authData = await authResponse.json();

      if (!authData.success || !authData.email) {
        triggerError(authData.message || "Session expired. Please log in.");
        setUserData(null);
        return;
      }

      // Step 2: Fetch Full Profile Data using email
      const userResponse = await fetch("http://localhost:5000/auth/get-user-data", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: authData.email }),
      });
      const userResult = await userResponse.json();

      if (userResult.success) {
        setUserData(userResult.user ?? null);
      } else {
        triggerError(userResult.message || "Failed to fetch user data.");
        setUserData(null);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      triggerError("Server error while fetching profile.");
      setUserData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Handler for Updating Profile Details
  async function handleUpdateProfile(updatedFormData) {
    try {
      const response = await fetch("http://localhost:5000/auth/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: userData?.email,
          ...updatedFormData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        triggerSuccess(data.message || "Profile updated successfully!");
        await fetchUserProfile(); // Refresh local state
        setActiveTab("overview");
      } else {
        triggerError(data.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      triggerError("Server connection error while updating profile.");
    }
  }

  // Handler for Changing Password
  async function handleChangePassword(passwordData) {
    try {
      const response = await fetch("http://localhost:5000/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: userData?.email,
          ...passwordData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        triggerSuccess(data.message || "Password changed successfully!");
        setActiveTab("overview");
      } else {
        triggerError(data.message || "Failed to change password.");
      }
    } catch (err) {
      console.error("Error changing password:", err);
      triggerError("Server connection error while changing password.");
    }
  }

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64 text-gray-500 font-medium">
          Loading profile...
        </div>
      );
    }

    if (!userData) {
      return (
        <div className="flex justify-center items-center h-64 text-red-500 font-medium">
          Unable to load profile data.
        </div>
      );
    }

    switch (activeTab) {
      case "overview":
        return <ProfileOverview userData={userData} setActiveTab={setActiveTab} />;

      case "edit":
        return (
          <EditProfile
            userData={userData}
            onSave={handleUpdateProfile}
            triggerSuccess={triggerSuccess}
            triggerError={triggerError}
            setActiveTab={setActiveTab}
          />
        );

      case "security":
        return (
          <ChangePassword
            userData={userData}
            onSave={handleChangePassword}
            triggerSuccess={triggerSuccess}
            triggerError={triggerError}
            setActiveTab={setActiveTab}
          />
        );

      default:
        return <ProfileOverview userData={userData} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-[calc(100vh-64px)] w-full">
      <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} userData={userData} />
      <main className="flex-1 p-4 md:p-8 w-full overflow-y-auto">
        {renderTabContent()}
      </main>

      {/* 🔴 ERROR MODAL CARD */}
      <ErrorModal
        isOpen={isErrorOpen}
        message={errorMsg}
        onClose={() => setIsErrorOpen(false)}
      />

      {/* 🟢 SUCCESS MODAL CARD */}
      <SuccessModal
        isOpen={isSuccessOpen}
        message={successMsg}
        onClose={() => setIsSuccessOpen(false)}
      />
    </div>
  );
};

export default ProfileLayout;