interface SidebarProps {
  activeSection: string | null;
  onSectionChange: (section: string) => void;
}

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const navItems = [
    { id: 'about', label: 'About Me' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Main Focus' },
  ];

  return (
    <aside 
      className="hidden md:fixed md:left-0 md:top-0 md:h-full md:w-64 md:p-6 md:z-40"
    >
      <div className="h-full flex flex-col">
        {/* Name and Title */}
        <div className="mb-8">
          <h1 
            className="text-2xl font-semibold mb-1"
            style={{ 
              color: 'hsl(45, 25%, 95%)',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Ruddy Simonpour
          </h1>
          <p 
            className="text-sm"
            style={{ 
              color: 'hsl(45, 30%, 75%)',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Data Scientist
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-4 flex-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            
            return (
              <div key={item.id} className="relative">
                <div 
                  className="absolute inset-0 rounded-xl border-2"
                  style={{ 
                    borderColor: isActive ? 'hsla(180, 50%, 60%, 0.8)' : 'hsla(45, 25%, 95%, 0.6)',
                    boxShadow: isActive ? '0 0 40px hsla(180, 50%, 60%, 0.35)' : '0 0 40px hsla(45, 25%, 95%, 0.35)',
                  }}
                />
                <div 
                  className="relative px-4 py-3 rounded-xl"
                  style={{ 
                    backgroundColor: 'transparent',
                  }}
                >
                  <button
                    onClick={() => onSectionChange(item.id)}
                    className="flex items-center justify-center w-full text-center transition-colors"
                    style={{
                      color: isActive ? 'hsl(180, 50%, 60%)' : 'hsl(45, 25%, 95%)',
                      fontFamily: "'Inter', sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'hsl(180, 50%, 60%)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'hsl(45, 25%, 95%)';
                      }
                    }}
                  >
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </nav>

      </div>
    </aside>
  );
};

export default Sidebar;

